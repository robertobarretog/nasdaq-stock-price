/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const express = require('express');
const router = express.Router();
const StocksController = require('../controller/stockController');

const API = '/api/stock-prices';
const stockscontroller = new StocksController();

//Index page (static HTML)
router.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'));

// API entrypoint
router.get(API, (req, res) => stockscontroller.getStockPrice(req.query.stock, req.ip, req.query.like, res));

module.exports = router;
