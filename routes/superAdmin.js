import express from "express"
import { createToken } from "../controllers/superAdmin.js"
import { createAdmin } from "../controllers/superAdmin.js"
import { adminlogin } from "../controllers/superAdmin.js"
import { superadminlogin } from "../controllers/superAdmin.js"
import { adminlogout } from "../controllers/superAdmin.js"
import { superadminlogout } from "../controllers/superAdmin.js"

const router = express.Router()

router.post("/createToken", createToken)
router.post("/createAdmin", createAdmin)
router.post("/adminlogin", adminlogin)
router.post("/superadminlogin", superadminlogin)
router.post("/adminlogout", adminlogout)
router.post("/superadminlogout", superadminlogout)

export default router