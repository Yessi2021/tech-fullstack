import { Router } from "express";
import * as bookController from "../controllers/books";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

// Middleware para validar JWT en todas las rutas de libros
router.use(validarJWT);

router.get("/api/books", bookController.getBooks);
router.get("/api/books/:id", bookController.getBookById);
router.post("/api/books", bookController.createBook);
router.put("/api/books/:id", bookController.updateBook);
router.delete("/api/books/:id", bookController.deleteBook);

export default router;
