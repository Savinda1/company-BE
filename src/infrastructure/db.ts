//LgzcQyf299uhFcS0

import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const MONGODB_URL=process.env.MONGODB_URL;
        if(!MONGODB_URL){
            throw new Error('MONGODB_URL is missing');
        }
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB Connected...');
    }
    catch (error) {
        console.log(" Error connecting to MongoDB");
        console.log(error);   
     
    }
};

export default connectDB;




