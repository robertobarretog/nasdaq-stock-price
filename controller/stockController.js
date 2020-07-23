const axios = require('axios');
const db = require('../controller/db');
const Stocks = require('../model/stock');


module.exports = class StocksController {

    constructor() {
        new db().connect();
        this.stocks = new Stocks();
    }

    getStockPrice(symbol, ip, like, res) {
        console.log('req.ip: ', ip);
        if (symbol) {
            const invalidArr = ["Unknown symbol", "Invalid symbol"];
            if (typeof symbol === "string") {
                axios.get(`https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`)
                    .then(response => {
                        // if an unknown symbol is sent, respond accordingly
                        if (invalidArr.indexOf(response.data) > -1) {
                            res.json({ message: "Unknown or invalid symbol" });
                        } else {
                            // if it is a known symbol, store it in db (if like is true) and respond with stock price
                            this.stocks.getStockWithIp(symbol, ip, like)
                                .then(doc => {
                                    res.json({ stockData: { "stock": symbol, "price": response.data.latestPrice, "likes": doc.ips.length, "companyName": response.data.companyName } });
                                })
                                .catch(error => res.json({ message: `ERROR fetching stock: ${error}` }));
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.json({ message: "error fetching data" });
                    });
            } else if (Array.isArray(symbol) && symbol.length === 2) {
                axios.all([
                    axios.get(`https://repeated-alpaca.glitch.me/v1/stock/${symbol[0]}/quote`),
                    axios.get(`https://repeated-alpaca.glitch.me/v1/stock/${symbol[1]}/quote`)
                ]).then(axios.spread((response1, response2) => {
                    // if either of the symbols is unknown, respond accordingly
                    if (invalidArr.indexOf(response1.data) > -1 || invalidArr.indexOf(response2.data) > -1) {
                        res.json({ message: "Unknown symbol or invalid symbol" });
                    } else {
                        // if it is a known symbol, store it in db (if like is true) and respond with stock price
                        this.stocks.getStockWithIp(symbol[0], ip, like)
                            .then(doc1 => {
                                this.stocks.getStockWithIp(symbol[1], ip, like)
                                    .then(doc2 => {
                                        res.json({
                                            stockData: [{ "stock": symbol[0], "price": response1.data.latestPrice, "rel_likes": doc1.ips.length - doc2.ips.length, "companyName": response1.data.companyName }
                                                , { "stock": symbol[1], "price": response2.data.latestPrice, "rel_likes": doc2.ips.length - doc1.ips.length, "companyName": response2.data.companyName }]
                                        });
                                    })
                                    .catch(error => res.json({ message: `ERROR fetching ${symbol[0]}:\n ${error}` }));
                            })
                            .catch(error => res.json({ message: `ERROR fetching ${symbol[1]}:\n ${error}` }));
                    }
                }))
                    .catch(error => {
                        console.log(error);
                        res.json({ message: "error fetching data" });
                    });
            } else {
                res.json({ message: "no more than 2 stock tickers should be sent" });
            }
        } else {
            res.json({ message: "stock ticker is required" });
        }

    };

};
