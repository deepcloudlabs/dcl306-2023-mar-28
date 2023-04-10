const StatisticsModule = {
    state: () => ({
        wins: 0,
        loses: 0
    }),
    mutations: {
        loadStatisticsState(state, payload) {
            state.statistics = payload;
        },
        saveGameState(state) {
            let storage = localStorage.getItem("mastermind-vuex");
            if (!storage) {
                storage = {};
            } else {
                storage = JSON.parse(storage);
            }
            storage.statistics = state;
            localStorage.setItem("mastermind-vuex", JSON.stringify(storage));
        },
        playerWins(state) {
            state.wins++;
            this.commit('saveGameState');
        },
        playerLoses(state) {
            state.loses++;
            this.commit('saveGameState');
        },
    },
    actions: {},
    getter: {}
}

export default StatisticsModule;