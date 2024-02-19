import express from "express";
import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import { initializeDatabase } from "./db";
import authPath from "./routes/auth";
import bookPath from "./routes/books";
import LoanPath from "./routes/loans";
import purchasePath from "./routes/purchase";
import { PORT } from "./configuration";

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(authPath);
app.use(bookPath);
app.use(LoanPath);
app.use(purchasePath);

async function main() {
  try {
    await initializeDatabase(); // Inicializar la base de datos
    console.log("DB CONNECTED");

    app.listen(PORT || 3000, () => {
      console.log("Server on port", PORT);
    });
  } catch (error) {
    console.log("ERROR AL CONECTARSE", error);
  }
}

main();
