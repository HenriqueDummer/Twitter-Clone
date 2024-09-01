import express from "express"
import { signIn, logIn, logOut } from "../controllers/auth.controller.js"

const router = express.Router()

router.post('/login', logIn )

router.post('/signin', signIn)

router.post('/logout', logOut)

export default router