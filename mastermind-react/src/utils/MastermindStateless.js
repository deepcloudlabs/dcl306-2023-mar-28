import GameConsole from "../component/mastermind/GameConsole";
import GameStatistics from "../component/mastermind/GameStatistics";

export default function MastermindStateless() {

    return (
        <>
            <GameConsole/>
            <p></p>
            <GameStatistics/>
        </>
    )
}