import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("animales")
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  IDE?: string;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  IDV?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Categoria?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Raza?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Pelo?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Grupo?: string;

  @Column({ type: "date", nullable: true })
  Fecha?: Date;

  @Column({ type: "time", nullable: true })
  Hora?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
