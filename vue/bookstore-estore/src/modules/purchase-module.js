const PurchaseModule = {
    state: () => ({
        purchases: []
    }),
    mutations: {
        addPurchase(state, items) {
            state.purchases = [...state.purchases, items];
        }

    }, // synchronous
    actions: {}, // asynchronous
    getter: {}
}

export default PurchaseModule;