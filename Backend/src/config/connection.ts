import mongoose from 'mongoose';

const connectDB = async (url:string) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB is Connected');
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;