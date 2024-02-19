import { STRIPE_PRIVATE_KEY } from "../configuration";
import stripe from "stripe";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entity/Book";
import { User } from "../entity/User";

export const comprarLibro = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  try {
    // Obtener información del usuario
    console.log("comprando...");

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Obtener información del libro
    const bookRepository = getRepository(Book);
    const book = await bookRepository.findOne(bookId);

    if (!book) {
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    // Verificar si STRIPE_PRIVATE_KEY está definido
    if (typeof STRIPE_PRIVATE_KEY === "string") {
      // Crear una instancia de stripe solo si la clave privada está definida
      const stripeClient = new stripe(STRIPE_PRIVATE_KEY);

      // Crear una sesión de pago en Stripe
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: book.title,
                description: book.author,
                images: [
                  "http://clipart-library.com/images_k/books-transparent-background/books-transparent-background-10.png",
                ],
              },
              unit_amount: book.price == null ? 100 : book.price * 1000,
            },
            quantity: 1,
          },
        ],

        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });

      // Retornar la URL de redirección a Stripe en la respuesta JSON
      return res
        .status(200)
        .json({ msg: "URL de pago generada", url: session.url });
    } else {
      // Manejar el caso en el que STRIPE_PRIVATE_KEY es undefined
      console.error("STRIPE_PRIVATE_KEY no está definido o no es una cadena");

      return res.status(500).json({ msg: "Error en la compra del libro" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error en la compra del libro" });
  }
};
