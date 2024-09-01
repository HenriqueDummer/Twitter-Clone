import express from "express"
import { signIn, logIn, logOut, getMe } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRouter.js"

const router = express.Router()

router.post('/login', logIn )

router.post('/signin', signIn)

router.post('/logout', logOut)

router.get('/me', protectRoute, getMe)

export default router