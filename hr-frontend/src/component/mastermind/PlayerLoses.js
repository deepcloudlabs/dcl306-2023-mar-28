import Container from "../common/Container";
import {Link} from "react-router-dom";

export default function PlayerLoses() {
    return(
        <Container title="Player loses the game...">
            <Link to="/">Play the game?</Link>
        </Container>
    )
}