import Container from "../common/Container";
import Card from "../common/Card";
import CardHeader from "../common/CardHeader";
import {Link} from "react-router-dom";

export default function PlayerWins() {
    return(
        <Container title="Player wins the game...">
            <Link to="/">Play the game</Link>
        </Container>
    )
}