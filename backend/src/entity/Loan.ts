import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.loans, { eager: true }) // eager loading para cargar la relación automáticamente
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Book, (book) => book.loans, { eager: true })
  @JoinColumn({ name: "bookId" })
  book: Book;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  loanDate: Date;

  @Column({ type: "timestamp", nullable: true })
  returnDate: Date;
}
