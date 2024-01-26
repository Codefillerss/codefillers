import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongo DB ${conn.connection.host}`.bgMagenta.white);
    } catch (error){
        console.log(`Error in Mongo DB ${error}`.bgRed.white);
    }
}

export default connectDB;