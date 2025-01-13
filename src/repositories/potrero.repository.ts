// src/repositories/potrero.repository.ts

import { AppDataSource } from "../utils/data-source";
import { PotreroEntity } from "../models/potrero.model";
import { CreatePotreroDto, UpdatePotreroDto } from "../interfaces/potrero.interface";

const potreroRepository = AppDataSource.getRepository(PotreroEntity);

export const findAllPotreros = async () => {
  return await potreroRepository.find();
};

export const findPotreroById = async (gid: number) => {
  return await potreroRepository.findOneBy({ gid });
};

export const createPotrero = async (potreroData: CreatePotreroDto) => {
  const potrero = potreroRepository.create(potreroData);
  return await potreroRepository.save(potrero);
};

export const updatePotrero = async (gid: number, potreroData: UpdatePotreroDto) => {
  await potreroRepository.update(gid, potreroData);
  return await potreroRepository.findOneBy({ gid });
};

export const deletePotrero = async (gid: number) => {
  return await potreroRepository.delete(gid);
};