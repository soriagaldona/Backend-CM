// src/controllers/potrero.controller.ts

import { Request, Response } from "express";
import {
  getAllPotreros,
  getPotreroById,
  createNewPotrero,
  updateExistingPotrero,
  removePotrero,
} from "../services/potrero.service";

export const getPotreros = async (req: Request, res: Response) => {
  try {
    const potreros = await getAllPotreros();
    res.status(200).json({ success: true, data: potreros });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPotrero = async (req: Request, res: Response) => {
  try {
    const potrero = await getPotreroById(Number(req.params.id));
    res.status(200).json({ success: true, data: potrero });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const createPotrero = async (req: Request, res: Response) => {
  try {
    const potrero = await createNewPotrero(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Potrero created successfully", 
      data: potrero 
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updatePotrero = async (req: Request, res: Response) => {
  try {
    const potrero = await updateExistingPotrero(Number(req.params.id), req.body);
    res.status(200).json({ 
      success: true, 
      message: "Potrero updated successfully", 
      data: potrero 
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deletePotrero = async (req: Request, res: Response) => {
  try {
    await removePotrero(Number(req.params.id));
    res.status(200).json({ 
      success: true, 
      message: "Potrero deleted successfully" 
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};