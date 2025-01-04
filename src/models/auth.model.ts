import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Usuarios")
export class Auth {
    @PrimaryGeneratedColumn()
    UsuarioID!: number;

    @Column()
    nombre!: string;

    @Column()
    apellido!: string;

    @Column({ unique: true })
    correo!: string;

    @Column()
    password!: string;

    @Column({ default: 2 })
    rol!: number;

    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP"
    })
    FechaCreacion!: Date;

    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    FechaActualizacion!: Date;
}