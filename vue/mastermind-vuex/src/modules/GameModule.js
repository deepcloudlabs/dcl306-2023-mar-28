import Move from "@/model/move";
import router from "@/router";

function getRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSecret(level) {
    let digits = []; // [5, 4, 9]
    digits.push(getRandomDigit(1, 9));
    while (digits.length < level) {
        let digit = getRandomDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    let nextSecret = digits.reduce((s, d) => 10 * s + d, 0);
    return nextSecret; // 549
}

function initializeGame(game) {
    game.tries = 0;
    game.secret = createSecret(game.level);
    game.moves = [];
    game.counter = 100;
}

function evaluateMove(guess, secret) {
    let guessAsString = guess.toString();
    let secretAsString = secret.toString();
    let perfectMatch = 0, partialMatch = 0;
    for (let i = 0; i < guessAsString.length; ++i) {
        let g = guessAsString.charAt(i);
        for (let j = 0; j < secretAsString.length; ++j) {
            let s = secretAsString.charAt(j);
            if (g === s) {
                if (i === j) {
                    perfectMatch++;
                } else {
                    partialMatch++;
                }
            }
        }
    }
    return new Move(guess, perfectMatch, partialMatch);
}

const GameModule = {
    state: () => ({
        secret: 123,
        guess: 456,
        level: 3,
        tries: 0,
        lives: 3,
        maxTries: 10,
        moves: [],
        counter: 100
    }),
    mutations: {
        saveGameState(state) {
            let storage = localStorage.getItem("mastermind-vuex");
            if (!storage) {
                storage = {};
            } else {
                storage = JSON.parse(storage);
            }
            storage.game = state;
            localStorage.setItem("mastermind-vuex", JSON.stringify(storage));
        },
        loadGameState(state, payload) {
            state.game = payload;
        },
        initializeSecret(state) {
            state.secret = createSecret(state.level);
        },
        play(state) {
            state.tries++;
            if (Number(state.secret) === Number(state.guess)) {
                if (state.level === 10) {
                    state.level = 3;
                    initializeGame(state);
                    router.push("/wins");
                } else {
                    state.level++;
                    state.maxTries += 2;
                    state.lives++;
                    this.commit('playerWins');
                    initializeGame(state);
                }
            } else {
                if (state.tries >= state.maxTries) {
                    state.lives--;
                    this.commit('playerLoses');
                    if (state.lives === 0) {
                        state.level = 3;
                        initializeGame(state);
                        router.push("/loses");
                    } else {
                        initializeGame(state);
                    }
                } else {
                    state.moves.push(evaluateMove(state.guess, state.secret));
                }
            }
            this.commit('saveGameState');
        },
        countdown(state) {
            state.counter--;
            if (state.counter <= 0) {
                this.commit('playerLoses');
                state.lives--;
                if (state.lives <= 0) {
                    router.push("/loses");
                } else {
                    initializeGame(state);
                }
            }
            this.commit('saveGameState');
        },
    },
    actions: {},
    getter: {}
}

export default GameModule;