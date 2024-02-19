import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Loan } from "./Loan";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];
}
