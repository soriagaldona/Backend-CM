// src/models/potrero.model.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("potreros")
export class PotreroEntity {
  @PrimaryGeneratedColumn()
  gid!: number;

  @Column({ type: "varchar", length: 254, nullable: true })
  id?: string;

  @Column({ type: "varchar", length: 254, nullable: true })
  potrero?: string;

  @Column({ type: "varchar", length: 254, nullable: true })
  pasto?: string;

  @Column({ type: "float8", nullable: true })
  id_retiro?: number;

  @Column({ type: "numeric", nullable: true })
  area?: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPolygon",
    srid: 4326,
    nullable: true,
  })
  geom?: any;
}