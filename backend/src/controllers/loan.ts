import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Loan } from "../entity/Loan";
import { Book } from "../entity/Book";
import { User } from "../entity/User";

export const prestarLibro = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  const { loanDate, returnDate } = req.body;

  try {
    const loanRepository = getRepository(Loan);
    const bookRepository = getRepository(Book);
    const user = await getRepository(User).findOne(parseInt(userId), {
      select: ["id", "name", "email"],
    });
    const book = await bookRepository.findOne(parseInt(bookId));

    if (!user || !book) {
      return res.status(404).json({ msg: "Usuario o libro no encontrado" });
    }

    const loan = loanRepository.create({
      user,
      book,
      loanDate,
      returnDate,
    });

    await loanRepository.save(loan);

    return res.status(200).json({
      msg: "Libro prestado exitosamente",
      user,
      book,
      loan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al prestar el libro" });
  }
};

export const devolverLibro = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;

  try {
    const loanRepository = getRepository(Loan);

    // Buscar el préstamo por userId y bookId
    const loan = await loanRepository.findOne({
      where: {
        user: { id: parseInt(userId) },
        book: { id: parseInt(bookId) },
        returnDate: null,
      },
    });

    if (!loan) {
      return res.status(404).json({
        msg: "El libro no está actualmente prestado por este usuario.",
      });
    }

    // Actualizar la fecha de retorno
    loan.returnDate = new Date();
    await loanRepository.save(loan);

    // Obtener información del usuario
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(loan.user.id, {
      select: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(404).json({
        msg: "No se pudo encontrar la información del usuario.",
      });
    }

    return res.json({
      msg: "Libro devuelto exitosamente",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al devolver el libro" });
  }
};
