import express from "express"

const router = express.Router()

router.get('/login', (req, res) => {
    res.status(200).json({message: "Login"})
})

router.get('/signin', (req, res) => {
    res.status(200).json({message: "signin"})
})

router.get('/logout', (req, res) => {
    res.status(200).json({message: "logout"})
})

export default router