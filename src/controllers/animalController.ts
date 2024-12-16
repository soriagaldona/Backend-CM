import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  getAllAnimals,
  getAnimalById,
  createNewAnimal,
  updateExistingAnimal,
  removeAnimal,
} from "../services/animalService";

/**
 * Handles the request to get all animals.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * 
 * @returns A JSON response with the list of animals or an error message.
 * 
 * @throws Will return a 500 status code and an error message if there is an issue retrieving the animals.
 */
export const getAnimals: RequestHandler = async (req, res) => {
  try {
    const animals = await getAllAnimals();
    res.status(200).json(animals);
  } catch (error: any) {
    res.status(500).json({ error: "Error retrieving animals.", detail: error.message });
  }
};

/**
 * Handles the request to get an animal by its ID.
 * 
 * @param req - The request object, containing the animal ID in the parameters.
 * @param res - The response object, used to send back the appropriate response.
 * 
 * @returns A JSON response with the animal data if found, or an error message if not found or if an error occurs.
 * 
 * @throws Will return a 404 status if the animal is not found.
 * @throws Will return a 500 status if there is an error retrieving the animal.
 */
export const getAnimal: RequestHandler = async (req, res) => {
  try {
    const animal = await getAnimalById(Number(req.params.id));
    if (!animal) {
      res.status(404).json({ error: "Animal not found." });
      return;
    }
    res.status(200).json(animal);
  } catch (error: any) {
    res.status(500).json({ error: "Error retrieving animal.", detail: error.message });
  }
};

/**
 * Handles the creation of a new animal.
 * 
 * This function is an Express request handler that processes the request to create a new animal.
 * It expects the request body to contain the necessary data for creating the animal.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * 
 * @returns A JSON response with a success message and the created animal object if successful,
 *          or an error message if the creation fails.
 * 
 * @throws Will return a 400 status code and an error message if there is an issue creating the animal.
 */
export const createAnimal: RequestHandler = async (req, res) => {
  try {
    const animal = await createNewAnimal(req.body);
    res.status(201).json({ message: "Animal created successfully.", animal });
  } catch (error: any) {
    res.status(400).json({ error: "Error creating animal.", detail: error.message });
  }
};

/**
 * Updates an existing animal with the provided data.
 *
 * @param req - The request object containing the animal ID in the params and the updated data in the body.
 * @param res - The response object used to send back the status and result of the update operation.
 *
 * @returns A JSON response with a success message and the updated animal data, or an error message if the update fails.
 *
 * @throws Will return a 500 status code and an error message if there is an issue updating the animal.
 */
export const updateAnimal: RequestHandler = async (req, res) => {
  try {
    const animal = await updateExistingAnimal(Number(req.params.id), req.body);
    res.status(200).json({ message: "Animal updated successfully.", animal });
  } catch (error: any) {
    res.status(500).json({ error: `Error updating animal with ID ${req.params.id}.`, detail: error.message });
  }
};

/**
 * Deletes an animal by its ID.
 *
 * @param req - The request object, containing the animal ID in the URL parameters.
 * @param res - The response object, used to send the status and JSON response.
 *
 * @throws Will return a 400 status code if the animal ID is invalid.
 * @throws Will return a 500 status code if there is an error during the deletion process.
 */
export const deleteAnimal: RequestHandler = async (req, res) => {
  try {
    const animalId = Number(req.params.id);
    if (isNaN(animalId)) {
      res.status(400).json({ error: "Invalid animal ID." });
      return;
    }
    await removeAnimal(animalId);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: `Error deleting animal with ID ${req.params.id}.`, detail: error.message });
  }
};
