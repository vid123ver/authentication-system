import { Router } from "express";
import { register , login , logout } from "../controllers/auth.controller";
import { profile , changePassword } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { changePasswordSchema , refreshTokenSchema , logoutSchema} from "../validators/auth.validator";
import { refreshToken } from "../services/auth.service";
import * as authController from "../controllers/auth.controller";
// refreshTokenSchema , refreshToken

const router = Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout

// Profile
router.get("/profile", authenticate, profile);

// Change Password

router.put(
    "/change-password",
    authenticate,
    validate(changePasswordSchema),
    changePassword
);

router.post(
    "/logout",
    validate(logoutSchema),
    logout
);

router.post(
    "/refresh-token",
    authController.refreshToken
);
export default router;