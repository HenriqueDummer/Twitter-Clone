import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const URI = process.env.MONGO_URI

let dbConection 

export const connectToMongoDB = async () => {
    try{
        await mongoose.connect(URI)
        console.log("Successfully connected to MongoDB")
    } catch(err){
        console.error(err)
        process.exit(1)
    }
}

