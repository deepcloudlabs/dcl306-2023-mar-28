const EstoreModule = {
    state: () => ({
        books: []
    }),
    mutations: {
        setBooks(state, books){
            this.state.books = books;
        }
    }, // synchronous
    actions: {
        async getBooks(context){
            const response = await fetch("http://localhost:9001/books",{
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });
            let books = await response.json();
            context.commit('setBooks', books);
        }
    }, // asynchronous
    getter:{}
}

export default  EstoreModule;