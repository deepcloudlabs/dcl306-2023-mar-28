export default class Move {
    constructor(guess, perfect, partial) {
        this.guess = guess;
        this.partial = partial;
        this.perfect = perfect;
        this.evaluation = "";

        if (perfect === 0 && partial === 0)
            this.evaluation = "No Match";
        else {
            if (partial > 0)
                this.evaluation = `-${partial}`;
            if (perfect > 0)
                this.evaluation += `+${perfect}`;
        }
    }
}