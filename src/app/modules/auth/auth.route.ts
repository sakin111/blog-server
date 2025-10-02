import {Router } from "express";




const router = Router()

router.post("/login", authController.CredentialLogin)
router.post("/refresh-token", authController.getNewAccessToken)
router.post("/logout", authController.logout)

export const authRoute = router