import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import MastermindHook from "./MastermindHook";
import {Route, Routes} from "react-router";
import PlayerWins from "./component/mastermind/PlayerWins";
import PlayerLoses from "./component/mastermind/PlayerLoses";
import {BrowserRouter} from "react-router-dom";
const routing =
    <Routes>
        <Route path="/" element={<MastermindHook />} />
        <Route path="/wins" element={<PlayerWins />} />
        <Route path="/loses" element={<PlayerLoses />} />
    </Routes>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {routing}
    </BrowserRouter>
);
