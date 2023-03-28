import React from "react";
import Container from "./component/common/Container";
import FormGroup from "./component/common/FormGroup";
import Badge from "./component/common/Badge";

// Stateful Component -> Class
class Mastermind extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            game: {
                secret: 549,
                guess: 123,
                level: 3,
                lives: 3,
                tries: 0,
                maxTries: 10,
                moves: [],
                counter: 60
            },
            statistics: {
                wins: 0,
                loses: 0,
                total: 0
            }
        };
    }

    countDown2 = () => {
        console.log(`beginning: ${JSON.stringify(this.state)}`)
        let counter = this.state.game.counter;
        counter--;
        this.setState({game: {...this.state.game, counter}}, ()=>{
            console.log(`callback: ${JSON.stringify(this.state)}`)
        })
    }

    countDown = () => {
        console.log(`beginning: ${JSON.stringify(this.state)}`)
        let game = {...this.state.game};
        game.counter--;
        this.setState({game}, ()=>{
            console.log(`callback: ${JSON.stringify(this.state)}`)
        })
    }
    componentDidMount() {
        this.timerId = setInterval(this.countDown, 1_000);

    }

    componentWillUnmount () {
        clearInterval(this.timerId);
    }

    handleInputChange = (e) => {
        let guess = Number(e.target.value);
        this.setState({game: {...this.state.game, guess}});
    }

    play = () => {
        let game = {...this.state.game};
        let statistics = {...this.state.statistics};
        game.tries++;
        this.setState({game, statistics});
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
                           value={this.state.game.tries}/> out of
                    <Badge id="maxTries"
                           bgColor="bg-info"
                           value={this.state.game.maxTries}/>
                </FormGroup>
                <FormGroup label="Counter" id="counter">
                    <Badge id="counter"
                           bgColor="bg-info"
                           value={this.state.game.counter}/>
                </FormGroup>
                <FormGroup label="Guess" id="guess">
                    <input type="text"
                           className="form-control"
                           id="guess"
                           name="guess"
                           onChange={this.handleInputChange}
                           value={this.state.game.guess}></input>
                    <button className="btn btn-success"
                    onClick={this.play}>Play</button>
                </FormGroup>
            </Container>
        );
    }
}

export default Mastermind;
