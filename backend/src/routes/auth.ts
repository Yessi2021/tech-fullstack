import { Router } from "express";
import { register, login } from "../controllers/auth";

const router = Router();

router.post("/api/auth/registe", register);
router.post("/api/auth/login", login);

export default router;
