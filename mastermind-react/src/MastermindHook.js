import Container from "./component/common/Container";
import FormGroup from "./component/common/FormGroup";
import Badge from "./component/common/Badge";
import ProgressBar from "./component/common/ProgressBar";
import Table from "./component/common/table/Table";
import TableHeader from "./component/common/table/TableHeader";
import TableBody from "./component/common/table/TableBody";
import EvaluateMove from "./component/mastermind/EvaluateMove";
import React, {useEffect, useState} from "react";
import createSecret from "./utils/GameUtils";
import Move from "./model/Move";
import {useNavigate} from "react-router-dom";

function initializeGame(game) {
    game.secret = createSecret(game.level);
    game.tries = 0;
    game.moves = [];
    game.counter = 60;
}
const initialSecret = createSecret(3);
const initialGameState = {
    secret: initialSecret,
    guess: 123,
    level: 3,
    lives: 3,
    tries: 0,
    maxTries: 10,
    moves: [],
    counter: 60,
    pbColorCounter: "bg-primary",
    pbWidthCounter: "100%"
};
export default function MastermindHook() {
    const [game, setGame] = useState(initialGameState);
    const [statistics, setStatistics] = useState({
        wins: 0,
        loses: 0,
        total: 0
    });

    const navigate = useNavigate();

    useEffect(()=>{
        const timerId = setInterval(countDown, 1_000);
        return () => {
            clearInterval(timerId);
        }
    })
    useEffect(saveStateToLocalStorage);

    useEffect(()=>{
        let state = localStorage.getItem("kiraz");
        console.log(state);
        if (state !== null){
            state = JSON.parse(state);
            setGame(state.game);
            setStatistics(state.statistics);
        }
        return  saveStateToLocalStorage;
    },[]);
    function handleInputChange(e) {
        let guess = Number(e.target.value);
        setGame({...game, guess});
    }

    function saveStateToLocalStorage(){
        let value = JSON.stringify( {game: {...game},statistics: {...statistics}});
        console.log(`Saving the game state (${value})to the localstorage.`)
        localStorage.setItem("kiraz",value);
    }

    function countDown(){
        let newGame = {...game};
        newGame.counter--;
        if (newGame.counter <= 0){
            initializeGame(newGame)
            newGame.lives--;
            if (newGame.lives === 0){
                //TODO: player loses!
            }
        }
        newGame.pbWidthCounter = Math.round(newGame.counter * 5 / 3).toString().concat("%");
        if (newGame.counter <= 30)
            newGame.pbColorCounter = "bg-danger";
        else if (newGame.counter <= 45)
            newGame.pbColorCounter = "bg-warning";
        else
            newGame.pbColorCounter = "bg-primary";
        setGame(newGame);
    }

    function play() {
        const newStatistics = {...statistics};
        const newGame = {...game};
        newGame.tries++;
        if (newGame.guess === newGame.secret) {
            newGame.level++;
            if (newGame.level > 10) {
                navigate("/wins");
            } else {
                initializeGame(newGame);
                newGame.lives++;
            }
        } else if (newGame.tries > newGame.maxTries) {
            if (newGame.lives === 0) {
                navigate("/loses");
            } else {
                newGame.lives--;
                initializeGame(newGame);
            }
        } else { // player has more tries
            newGame.moves.push(new Move(newGame.guess, newGame.secret));
        }
        setGame(newGame);
        setStatistics(newStatistics);
    }

    return (
        <Container title="Mastermind (hooks version)">
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