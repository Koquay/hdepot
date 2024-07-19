const mongoose = require('mongoose');
// const chalk = require('chalk');

module.exports = async () => {
    const DB = process.env.DB || 'mongodb://localhost:27017/hdepot';

    try {
        mongoose.set('strictQuery', false);
        
        mongoose.connect(DB)

        console.log('*** CONNECTED TO MONGODB ***')
    } catch(error) {
        console.log('*** CONNECTION TO MONGODB FAILED ***')
        console.log('error', error)
        throw error;
    }
}