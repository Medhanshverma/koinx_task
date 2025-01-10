const express = require('express');
const Joi = require('joi');
const Crypto = require('../models/crypto');

const router = express.Router();

router.get('/stats', async (req, res) => {
    const schema = Joi.object({
        coin: Joi.string().valid('bitcoin', 'matic-network', 'ethereum').required(),
    });

    const { error, value } = schema.validate(req.query);
    if (error) return res.status(400).send({ error: error.details[0].message });

    try {
        const latestData = await Crypto.findOne({ coin: value.coin }).sort({ timestamp: -1 });
        if (!latestData) return res.status(404).send({ error: 'Data not found' });

        res.send({
            price: latestData.price,
            marketCap: latestData.marketCap,
            '24hChange': latestData.change24h,
        });
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
