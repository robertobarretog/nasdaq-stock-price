const mongoose = require('mongoose');

const DB_URI = process.env.DB;

module.exports = class DB {
    async connect() {
        try {
            console.log('mongodb connection established');
            return mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        }
        catch (error) {
            return console.log(error.message);
        }
    }
};