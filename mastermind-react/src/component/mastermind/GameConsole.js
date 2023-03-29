import FormGroup from "../common/FormGroup";
import Badge from "../common/Badge";
import ProgressBar from "../common/ProgressBar";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
import TableBody from "../common/table/TableBody";
import EvaluateMove from "./EvaluateMove";
import Container from "../common/Container";
import {useEffect} from "react";
import {useGame, useGameDispatcher} from "../../provider/GameProvider";

export default function GameConsole() {
    const game = useGame();
    const gameDispatcher = useGameDispatcher();

    function play(event) {
        gameDispatcher({type: "PLAY", event});
    }

    function handleInputChange(event) {
        gameDispatcher({type: "GUESS_CHANGED", event});
    }

    useEffect(() => {
        const timerId = setInterval(() => gameDispatcher({type: "TIME_OUT"}), 1_000);
        console.log("useEffect() is  in action....")
        return () => {
            clearInterval(timerId);
        }
    },[]);
    return (
        <Container title="Mastermind (context api + reducer version)">
            <FormGroup label="Game Level" id="level">
                <Badge id="level"
                       bgColor="bg-success"
                       value={game.level}/>
            </FormGroup>
            <FormGroup label="Lives" id="lives">
                <Badge id="lives"
                       bgColor="bg-warning"
                       value={game.lives}/>
            </FormGroup>
            <FormGroup id="tries" label="Tries">
                <Badge id="tries"
                       bgColor="bg-danger"
                       value={game.tries}/>
                <span className="form-label"> out of </span>
                <Badge id="maxTries"
                       bgColor="bg-info"
                       value={game.maxTries}/>
            </FormGroup>
            <FormGroup label="Counter" id="counter">
                <Badge id="counter"
                       bgColor="bg-info"
                       value={game.counter}/>
                <ProgressBar id="counter"
                             value={game.counter}
                             pbColor={game.pbColorCounter}
                             pbWidth={game.pbWidthCounter}></ProgressBar>
            </FormGroup>
            <FormGroup label="Guess" id="guess">
                <input type="text"
                       className="form-control"
                       id="guess"
                       name="guess"
                       onChange={handleInputChange}
                       value={game.guess}></input>
                <button className="btn btn-success"
                        onClick={play}>Play
                </button>
            </FormGroup>
            <FormGroup label="Moves">
                <Table id="moves">
                    <TableHeader columns="ID,Guess,Message,Evaluation"/>
                    <TableBody>
                        {
                            game.moves.map((move, index) =>
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