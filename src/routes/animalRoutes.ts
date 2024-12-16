import { Router } from "express";
import {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController";
import { validateDto } from "../middleware/validate.middleware";
import { CreateAnimalDto } from "../validators/animal.dto";

const router = Router();

router.get("/animales", getAnimals);
router.get("/animales/:id", getAnimal);
router.post("/animales", validateDto(CreateAnimalDto), createAnimal);
router.put("/animales/:id", validateDto(CreateAnimalDto), updateAnimal);
router.delete("/animales/:id", deleteAnimal);

export default router;
