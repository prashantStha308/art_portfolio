import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI).catch((error)=>{
            console.error("Couldn't connect to database");
            process.exit(1);
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);//process code 1 means failure
    }
}