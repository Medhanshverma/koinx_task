const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const fetchCryptoData = async (coinId) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
    try {
        const { data } = await axios.get(url);
        const coinData = data[coinId];
        return {
            price: coinData.usd,
            marketCap: coinData.usd_market_cap,
            change24h: coinData.usd_24h_change,
        };
    } catch (err) {
        console.error(`Error fetching data for ${coinId}:`, err.message);
        throw new Error('Failed to fetch data');
    }
};

module.exports = fetchCryptoData;
