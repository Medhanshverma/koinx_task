const express = require('express');
const connectDB = require('./database');
const statsRouter = require('./routes/stats');
const deviationRouter = require('./routes/deviation');
const startCronJob = require('./jobs/fetchPrices');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', statsRouter);
app.use('/api', deviationRouter);

startCronJob();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
