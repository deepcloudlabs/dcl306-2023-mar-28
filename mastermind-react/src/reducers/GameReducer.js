import Move from "../model/Move";
import createSecret from "../utils/GameUtils";
function initializeGame(game) {
    game.secret = createSecret(game.level);
    game.tries = 0;
    game.moves = [];
    game.counter = 60;
}
function play(game) {
    game.tries++;
    if (game.guess === game.secret) {
        game.level++;
        if (game.level > 10) {
            // navigate("/wins");
        } else {
            initializeGame(game);
            game.lives++;
        }
    } else if (game.tries > game.maxTries) {
        if (game.lives === 0) {
            // navigate("/loses");
        } else {
            game.lives--;
            initializeGame(game);
        }
    } else { // player has more tries
        game.moves.push(new Move(game.guess, game.secret));
    }
}
function handleInputChange(game,event) {
    game.guess = Number(event.target.value);
}

function countDown(game){
    game.counter--;
    if (game.counter <= 0){
        initializeGame(game)
        game.lives--;
        if (game.lives === 0){
            //TODO: player loses!
        }
    }
    game.pbWidthCounter = Math.round(game.counter * 5 / 3).toString().concat("%");
    if (game.counter <= 30)
        game.pbColorCounter = "bg-danger";
    else if (game.counter <= 45)
        game.pbColorCounter = "bg-warning";
    else
        game.pbColorCounter = "bg-primary";
}
export default function GameReducer(game, action){
    const newGame = {...game};
    switch (action.type) {
        case "PLAY":
            play(newGame);
            break;
        case "GUESS_CHANGED":
            handleInputChange(newGame,action.event);
            break;
        case "TIME_OUT":
            countDown(newGame);
            break;
    }
    return newGame;
}