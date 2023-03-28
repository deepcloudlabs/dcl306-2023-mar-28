export default class Move {
    constructor(guess, secret) {
        this.guess = guess;
        this.evaluate(guess, secret);
    }

    evaluate = (guess, secret) => {
        const guessAsString = guess.toString();
        const secretAsString = secret.toString();
        this.perfectMatch = 0;
        this.partialMatch = 0;
        //region find perfect and partial matches
        for (let i = 0; i < guessAsString.length; i++) {
            const g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; j++) {
                const s = secretAsString.charAt(j);
                if (s === g) {
                    if (i === j) {
                        this.perfectMatch++;
                    } else {
                        this.partialMatch++;
                    }
                }
            }
        }
        //endregion
        if (this.perfectMatch === 0 && this.partialMatch === 0) {
            this.message = "No match";
        } else {
            this.message = "";
            if (this.partialMatch > 0) {
                this.message += `-${this.partialMatch}`;
            }
            if (this.perfectMatch > 0) {
                this.message += `+${this.perfectMatch}`;
            }
        }
    }
}