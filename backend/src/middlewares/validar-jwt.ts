// Crear una interfaz personalizada para extender Request
interface CustomRequest extends Request {
  uid?: string;
  name?: string;
}

// Middleware validar-jwt.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Obtener el token del header
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    // Verificar el token
    const { uid, name } = jwt.verify(
      token,
      "Esto-Es-UnA-Palb@_SecretA123457"
    ) as any;

    // Agregar las propiedades uid y name al objeto req
    req.uid = uid;
    req.name = name;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};
