// src/interfaces/potrero.interface.ts

export interface Potrero {
    gid: number;
    id?: string;
    potrero?: string;
    pasto?: string;
    id_retiro?: number;
    area?: number;
    geom?: any; // We'll use any for now as the geometry type is handled by TypeORM
  }
  
  export interface CreatePotreroDto {
    id?: string;
    potrero?: string;
    pasto?: string;
    id_retiro?: number;
    area?: number;
    geom: any;
  }
  
  export interface UpdatePotreroDto {
    id?: string;
    potrero?: string;
    pasto?: string;
    id_retiro?: number;
    area?: number;
    geom?: any;
  }