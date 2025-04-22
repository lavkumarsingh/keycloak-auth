import express from "express";
import { 
    login, 
    callback, 
    // refreshToken, 
    // logout,
    // getUserInfo
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", login);
router.get("/callback", callback);
// router.get("/refreshToken", refreshToken);
// router.get("/logout", logout);
// router.get("/me", getUserInfo);

export default router;