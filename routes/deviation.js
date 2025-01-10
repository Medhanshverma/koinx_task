const express = require('express');
const Joi = require('joi');
const Crypto = require('../models/crypto');

const router = express.Router();

router.get('/deviation', async (req, res) => {
    const schema = Joi.object({
        coin: Joi.string().valid('bitcoin', 'matic-network', 'ethereum').required(),
    });

    const { error, value } = schema.validate(req.query);
    if (error) return res.status(400).send({ error: error.details[0].message });

    try {
        const records = await Crypto.find({ coin: value.coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length < 2) return res.status(400).send({ error: 'Not enough data to calculate deviation' });

        const prices = records.map((r) => r.price);
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const variance = prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) / prices.length;
        const deviation = Math.sqrt(variance);

        res.send({ deviation: deviation.toFixed(2) });
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
