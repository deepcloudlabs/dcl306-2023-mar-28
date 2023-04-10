import BookItem from "@/model/basket";

const BasketModule = {
    state: () => ({
        items: []
    }),
    mutations: {
        addItem(state, book) {
            for (let item of state.items) {
                if (book.isbn === item.book.isbn) {
                    item.incrementQuantity();
                    state.items = [...state.items];
                    return;
                }
            }
            state.items = [...state.items, new BookItem(book, 1)]
        },
        removeItem(state, itemToRemove) {
            for (let item of state.items) {
                if (item.book.isbn === itemToRemove.book.isbn) {
                    item.decrementQuantity();
                    state.items = state.items.filter(item => item.quantity !== 0);
                    return;
                }
            }
        }, resetBasket(state) {
            state.items = []
        }
    }, // synchronous
    actions: {
        async purchase(context) {
            let items = [...context.state.items];
            const response = await fetch("http://localhost:9001/purchases", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(items)
            });
            let result = await response.json();
            if (result.status === "Ok") {
                context.commit('resetBasket');
                context.commit('addPurchase', items);
            }
        }
    }, // asynchronous
    getter: {}
}

export default BasketModule;