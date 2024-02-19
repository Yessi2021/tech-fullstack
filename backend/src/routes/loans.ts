import { Router } from "express";
import * as loanController from "../controllers/loan";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

// Middleware para validar JWT en todas las rutas de préstamos
router.use(validarJWT);

router.post("/api/loans/:userId/:bookId", loanController.prestarLibro);
router.put("/api/loans/:userId/:bookId", loanController.devolverLibro);

export default router;
