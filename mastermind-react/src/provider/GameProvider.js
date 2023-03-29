import {createContext, useContext, useReducer} from "react";
import MastermindStateless from "../utils/MastermindStateless";
import GameReducer from "../reducers/GameReducer";
import StatisticsReducer from "../reducers/StatisticsReducer";

export const GameContext = createContext(null);
export const StatisticsContext = createContext(null);

export function useGame() {
    const {game} = useContext(GameContext);
    return game;
}

export function useStatistics() {
    const {statistics} = useContext(StatisticsContext);
    return statistics;
}

export function useGameDispatcher(){
    const {gameDispatcher} = useContext(GameContext);
    return gameDispatcher;
}
export function useStatisticsDispatcher(){
    const {statisticsDispatcher} = useContext(StatisticsContext);
    return statisticsDispatcher;
}
const initialStatisticsState = {
    wins: 0,
    loses: 0,
    total: 0
};
const initialGameState = {
    secret: 549,
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
export default function GameProvider() {
    const [game, gameDispatcher] = useReducer(GameReducer,initialGameState);
    const [statistics, statisticsDispatcher] = useReducer(StatisticsReducer,initialStatisticsState);
    return (
      <GameContext.Provider value={{game, gameDispatcher}}>
          <StatisticsContext.Provider value={{statistics, statisticsDispatcher}}>
              <MastermindStateless />
          </StatisticsContext.Provider>
      </GameContext.Provider>
    );
}