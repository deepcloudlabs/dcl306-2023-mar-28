import React from "react";
import Container from "./component/common/Container";
import FormGroup from "./component/common/FormGroup";
import Badge from "./component/common/Badge";
import createSecret from "./utils/GameUtils";
import Move from "./model/Move";
import Table from "./component/common/table/Table";
import TableHeader from "./component/common/table/TableHeader";
import TableBody from "./component/common/table/TableBody";
import EvaluateMove from "./component/mastermind/EvaluateMove";
import ProgressBar from "./component/common/ProgressBar";

// Stateful Component -> Class
class Mastermind extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            game: {
                secret: createSecret(3),
                guess: 123,
                level: 3,
                lives: 3,
                tries: 0,
                maxTries: 10,
                moves: [],
                counter: 60,
                pbColorCounter: "bg-primary",
                pbWidthCounter: "100%"
            },
            statistics: {
                wins: 0,
                loses: 0,
                total: 0
            }
        };
    }

    countDown2 = () => {
        let counter = this.state.game.counter;
        counter--;
        // Note: this.setState is an async function
        this.setState({game: {...this.state.game, counter}}, () => {
            //console.log(`after callback: ${JSON.stringify(this.state)}`)
        })
    }
    initializeGame = (game) => {
        game.secret = createSecret(game.level);
        game.tries = 0;
        game.moves = [];
        game.counter = 60;
    }

    saveStateToLocalStorage = ()=>{
        let state = {...this.state};
        localStorage.setItem("armut",JSON.stringify(state));
    }

    countDown = () => {
        // console.log(`beginning: ${JSON.stringify(this.state)}`)
        let game = {...this.state.game};
        game.counter--;
        if (game.counter <= 0){
            this.initializeGame(game)
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
        this.setState({game}, this.saveStateToLocalStorage);
    }

    componentDidMount() {
        this.timerId = setInterval(this.countDown, 1_000);
        let state = localStorage.getItem("armut");
        if (state !== null){
            state = JSON.parse(state);
            this.setState(state);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleInputChange = (e) => {
        let guess = Number(e.target.value);
        this.setState({game: {...this.state.game, guess}}, this.saveStateToLocalStorage);
    }

    play = () => {
        const statistics = {...this.state.statistics};
        const game = {...this.state.game};
        game.tries++;
        if (game.guess === game.secret) {
            game.level++;
            if (game.level > 10) {
                //TODO: player wins the game
            } else {
                this.initializeGame(game);
                game.lives++;
            }
        } else if (game.tries > game.maxTries) {
            if (game.lives === 0) {
                //TODO: player loses the game
            } else {
                game.lives--;
                this.initializeGame(game);
            }
        } else { // player has more tries
            game.moves.push(new Move(game.guess, game.secret));
        }
        this.setState({game, statistics}, this.saveStateToLocalStorage);
    }

    render() {
        return (
            <Container title="Mastermind">
                <FormGroup label="Game Level" id="level">
                    <Badge id="level"
                           bgColor="bg-success"
                           value={this.state.game.level}/>
                </FormGroup>
                <FormGroup label="Lives" id="lives">
                    <Badge id="lives"
                           bgColor="bg-warning"
                           value={this.state.game.lives}/>
                </FormGroup>
                <FormGroup id="tries" label="Tries">
                    <Badge id="tries"
                           bgColor="bg-danger"
                           value={this.state.game.tries}/>
                    <span className="form-label"> out of </span>
                    <Badge id="maxTries"
                           bgColor="bg-info"
                           value={this.state.game.maxTries}/>
                </FormGroup>
                <FormGroup label="Counter" id="counter">
                    <Badge id="counter"
                           bgColor="bg-info"
                           value={this.state.game.counter}/>
                    <ProgressBar id="counter"
                                 value={this.state.game.counter}
                                 pbColor={this.state.game.pbColorCounter}
                                 pbWidth={this.state.game.pbWidthCounter}></ProgressBar>
                </FormGroup>
                <FormGroup label="Guess" id="guess">
                    <input type="text"
                           className="form-control"
                           id="guess"
                           name="guess"
                           onChange={this.handleInputChange}
                           value={this.state.game.guess}></input>
                    <button className="btn btn-success"
                            onClick={this.play}>Play
                    </button>
                </FormGroup>
                <FormGroup label="Moves">
                    <Table id="moves">
                        <TableHeader columns="ID,Guess,Message,Evaluation"/>
                        <TableBody>
                            {
                                this.state.game.moves.map((move, index) =>
                                    <tr key={move.guess}>
                                        <td>{index + 1}</td>
                                        <td>{move.guess}</td>
                                        <td>{move.message}</td>
                                        <td><EvaluateMove move={move}/></td>
                                    </tr>
                                )
                            }
                        </TableBody>
                    </Table>
                </FormGroup>
            </Container>
        );
    }
}

export default Mastermind;
