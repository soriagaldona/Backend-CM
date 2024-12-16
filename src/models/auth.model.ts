// ./src/models/auth.model.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Represents the Auth entity for the "Usuarios" table.
 */
@Entity("Usuarios")
export class Auth {
  /**
   * Unique identifier for the user.
   */
  @PrimaryGeneratedColumn()
  UsuarioID!: number;

  /**
   * First name of the user.
   */
  @Column()
  nombre!: string;

  /**
   * Last name of the user.
   */
  @Column()
  apellido!: string;

  /**
   * Email address of the user. Must be unique.
   */
  @Column({ unique: true })
  correo!: string;

  /**
   * Password for the user's account.
   */
  @Column()
  password!: string;

  /**
   * Role of the user. Default is 2 (Cliente).
   * 1: Admin
   * 2: Cliente
   */
  @Column({ default: 2 })
  rol!: number;

  /**
   * Timestamp of when the user was created.
   * Defaults to the current timestamp.
   */
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  FechaCreacion!: Date;

  /**
   * Timestamp of the last update to the user's record.
   * Defaults to the current timestamp and updates on record change.
   */
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  FechaActualizacion!: Date;
}
