import { createConnection, Connection } from "typeorm";
import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { Loan } from "./entity/Loan";

let AppDataSource: Connection;

const initializeDatabase = async () => {
  AppDataSource = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "biblioteca",
    synchronize: true,
    logging: true,
    entities: [User, Book, Loan],
  });

  console.log("DB IS CONNECTED");
};

export { AppDataSource, initializeDatabase };
