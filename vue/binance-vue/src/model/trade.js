class Trade {
    constructor(trade) {
        this.symbol = trade.symbol || "BTCUSDT";
        this.price = trade.price || 0;
        this.quantity = trade.quantity || 0;
        this.timestamp = trade.timestamp || '';
    }
}

export default Trade;