const cron = require('node-cron');
const fetchCryptoData = require('../services/fetchCryptoData');
const Crypto = require('../models/crypto');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchAndStoreCryptoData = async () => {
    for (const coin of coins) {
        try {
            const data = await fetchCryptoData(coin);
            await Crypto.create({ coin, ...data });
            console.log(`Stored data for ${coin}`);
        } catch (err) {
            console.error(`Failed to store data for ${coin}:`, err.message);
        }
    }
};

const startCronJob = () => {
    cron.schedule('0 */2 * * *', fetchAndStoreCryptoData); // Every 2 hours cron job
    console.log("Scheduled job to fetch crypto data every 2 hours");
};

module.exports = startCronJob;
