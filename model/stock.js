const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = class Stocks {

    constructor() {
        this.stockSchema = new Schema({
            symbol: { type: String, required: true, unique: true },
            ips: [String]
        });

        this.Stock = mongoose.model('Stock', this.stockSchema);
    };

    async getStockWithIp(symbol, ip, like) {
        let stock = await this.Stock.findOne({ symbol: symbol, ips: ip });
        if (!stock && like == "true") {
            stock = await this.Stock.findOneAndUpdate(
                { symbol: symbol },
                { $push: { ips: ip } },
                { new: true, upsert: true });
            console.log('stock saved: ', stock);
            return stock;
        } else if (stock) {
            console.log('stock found: ', stock);
            return stock;
        } else {
            console.log('stock not found, returning object with empty array { ips: [] }');
            return { ips: [] };
        }
    };

};
