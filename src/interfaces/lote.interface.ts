export interface CreateLoteDTO {
    lote_name: string;
    potreros_id: string;
    latitude?: number;
    longitude?: number;
}

export interface UpdateLoteDTO {
    lote_name?: string;
    potreros_id?: string;
    latitude?: number;
    longitude?: number;
}

export interface LoteFilters {
    potreros_id?: string;
    lote_name?: string;
    created_by?: number;
    created_on?: Date;
}

export interface CreatorInfo {
    UsuarioID: number;
    nombre: string;
    apellido: string;
}