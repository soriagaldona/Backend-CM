// src/services/potrero.service.ts

import {
    findAllPotreros,
    findPotreroById,
    createPotrero,
    updatePotrero,
    deletePotrero,
  } from "../repositories/potrero.repository";
  import { CreatePotreroDto, UpdatePotreroDto } from "../interfaces/potrero.interface";
  
  export const getAllPotreros = async () => {
    return await findAllPotreros();
  };
  
  export const getPotreroById = async (gid: number) => {
    const potrero = await findPotreroById(gid);
    if (!potrero) {
      throw new Error(`Potrero with ID ${gid} not found`);
    }
    return potrero;
  };
  
  export const createNewPotrero = async (potreroData: CreatePotreroDto) => {
    // Add any validation logic here
    return await createPotrero(potreroData);
  };
  
  export const updateExistingPotrero = async (gid: number, potreroData: UpdatePotreroDto) => {
    const potrero = await findPotreroById(gid);
    if (!potrero) {
      throw new Error(`Potrero with ID ${gid} not found`);
    }
    return await updatePotrero(gid, potreroData);
  };
  
  export const removePotrero = async (gid: number) => {
    const potrero = await findPotreroById(gid);
    if (!potrero) {
      throw new Error(`Potrero with ID ${gid} not found`);
    }
    return await deletePotrero(gid);
  };