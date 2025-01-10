const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongoURI = 'mongodb+srv://myth:gg123@cluster0.7ablm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; //dotenv lib not working HARD CODED

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
