import { Router } from "express";
import { register , login , logout } from "../controllers/auth.controller";
import { profile , changePassword } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { registerSchema,
    loginSchema,changePasswordSchema , refreshTokenSchema , logoutSchema} from "../validators/auth.validator";
import { refreshToken } from "../services/auth.service";
import * as authController from "../controllers/auth.controller";
// refreshTokenSchema , refreshToken

const router = Router();

// Register
router.post("/register",validate(registerSchema), register);

// Login
router.post("/login", validate(loginSchema), login);


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
    validate(refreshTokenSchema),
    authController.refreshToken
);
export default router;