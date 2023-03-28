import Badge from "../common/Badge";

export default function EvaluateMove({move}) {
    let perfectMatch = <></>;
    if (move.perfectMatch > 0)
        perfectMatch = <Badge id="perfect" value={move.perfectMatch} bgColor="bg-success" />
    let partialMatch = <></>;
    if (move.partialMatch> 0)
        partialMatch = <Badge id="partial" value={move.partialMatch} bgColor="bg-danger" />
    let noMatch = <></>;
    if (move.perfectMatch === 0 && move.partialMatch === 0)
        noMatch = <Badge id="noMatch" value="No Match" bgColor="bg-warning" />

    return (
        <>{partialMatch}{perfectMatch}{noMatch}</>
    )
}