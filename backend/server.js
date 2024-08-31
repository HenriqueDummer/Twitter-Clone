import express from "express"
import authRoutes from "./Routes/auth.routes.js"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})