export default class BookItem {
    constructor(book, quantity = 1) {
        this.book = book;
        this.quantity = quantity;
        this.price = Number(quantity) * Number(book.price);
    }

    incrementQuantity = () => {
        this.quantity++;
        this.price = Number(this.quantity) * Number(this.book.price);
    }
    decrementQuantity = () => {
        this.quantity--;
        this.price = Number(this.quantity) * Number(this.book.price);
    }
}