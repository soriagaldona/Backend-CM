// src/models/ValidadorArchivos.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsString, Length } from "class-validator";

@Entity()
export class ValidadorArchivos {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty({ message: "El nombre de la columna no puede estar vacío." })
  @Length(3, 255, { message: "El nombre de la columna debe tener entre 3 y 255 caracteres." })
  ColumnName!: string;

  @Column()
  @IsString()
  @IsNotEmpty({ message: "La clasificación no puede estar vacía." })
  @Length(3, 100, { message: "La clasificación debe tener entre 3 y 100 caracteres." })
  Classification!: string;

  @Column()
  @IsString()
  @Length(0, 500, { message: "La descripción no puede exceder los 500 caracteres." })
  Description!: string;

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
