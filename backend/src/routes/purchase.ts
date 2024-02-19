import express from "express";
import { comprarLibro } from "../controllers/purchase";

const router = express.Router();

// Ruta para comprar un libro
router.post("/api/purchase", comprarLibro);

export default router;
