import {MongoClient} from "mongodb"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const URI = process.env.MONGO_URI

let dbConection 

export const connectToMongoDB = async (callback) => {
    try{
        const conn = mongoose.connect(URI)
        console.log("Successfully connected to MongoDB")
        return callback()
    } catch(err){
        console.error(err)
        process.exit()
    }
}

