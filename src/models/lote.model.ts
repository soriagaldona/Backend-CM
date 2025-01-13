import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Auth } from "./auth.model";
import { LoteHistoryEntity } from "./loteHistory.model";

@Entity("lotes")
export class LoteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    lote_name!: string;

    @Column({ type: "varchar", length: 255 })
    potreros_id!: string;

    @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
    latitude!: number;

    @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
    longitude!: number;

    @Column({ name: "created_by" })
    createdBy!: number;

    @CreateDateColumn({ name: "created_on" })
    createdOn!: Date;

    @ManyToOne(() => Auth)
    @JoinColumn({ name: "created_by" })
    creator!: Auth;

    @OneToMany(() => LoteHistoryEntity, history => history.lote)
    updateHistory!: LoteHistoryEntity[];
}