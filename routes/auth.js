import express from "express"
import { logout, signup } from "../controllers/auth.js"
import { login } from "../controllers/auth.js"

const router = express.Router()

router.put("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

  
export default router