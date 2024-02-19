import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entity/Book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await getRepository(Book).find();
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error fetching books" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await getRepository(Book).findOne(id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    return res.json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error fetching book" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, publicationYear } = req.body;

  try {
    const bookRepository = getRepository(Book);
    const book = bookRepository.create({ title, author, publicationYear });
    await bookRepository.save(book);

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error creating book" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bookRepository = getRepository(Book);
    const book = await bookRepository.findOne(id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    bookRepository.merge(book, req.body);
    const updatedBook = await bookRepository.save(book);

    return res.json(updatedBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error updating book" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bookRepository = getRepository(Book);
    const book = await bookRepository.findOne(id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await bookRepository.delete(id);

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error deleting book" });
  }
};
