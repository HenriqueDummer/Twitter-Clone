import express from "express"
import authRoutes from "./Routes/auth.routes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import {connectToMongoDB} from "./db/connectMongoDB.js"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())

connectToMongoDB(() => {
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT)
    })
})

app.use("/api/auth", authRoutes)




