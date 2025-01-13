import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { LoteEntity } from "./lote.model";
import { Auth } from "./auth.model";

@Entity("lote_history")
export class LoteHistoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    lote_id!: number;

    @Column({ name: "updated_by" })
    updatedBy!: number;

    @CreateDateColumn({ name: "updated_on" })
    updatedOn!: Date;

    @ManyToOne(() => LoteEntity)
    @JoinColumn({ name: "lote_id" })
    lote!: LoteEntity;

    @ManyToOne(() => Auth)
    @JoinColumn({ name: "updated_by" })
    updater!: Auth;
}