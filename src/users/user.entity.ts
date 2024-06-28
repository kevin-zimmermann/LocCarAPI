import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {File} from "../files/file.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];

}