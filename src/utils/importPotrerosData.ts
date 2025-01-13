// src/utils/importPotrerosData.ts
import { AppDataSource } from "./data-source";
import { PotreroEntity } from "../models/potrero.model";
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const importPotrerosData = async (): Promise<void> => {
  try {
    // Initialize database connection if not initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const potreroRepository = AppDataSource.getRepository(PotreroEntity);

    // Check if data already exists
    const count = await potreroRepository.count();
    if (count > 0) {
      console.log('Potreros table already contains data. Skipping import.');
      return;
    }

    // Read seed file
    const seedFile = path.join(__dirname, '../seeds/potreros-seed.json');
    if (!fs.existsSync(seedFile)) {
      throw new Error('Seed file not found. Please ensure potreros-seed.json exists in the seeds directory.');
    }

    const potreros = JSON.parse(fs.readFileSync(seedFile, 'utf8'));

    // Insert data using raw query to properly handle geometry
    for (const potrero of potreros) {
      await potreroRepository.query(`
        INSERT INTO potreros (
          id, 
          potrero, 
          pasto, 
          id_retiro, 
          area, 
          geom
        ) VALUES ($1, $2, $3, $4, $5, ST_GeomFromGeoJSON($6))
      `, [
        potrero.id,
        potrero.potrero,
        potrero.pasto,
        potrero.id_retiro,
        potrero.area,
        JSON.stringify(potrero.geom)
      ]);
    }

    console.log(`Successfully imported ${potreros.length} potreros`);
  } catch (error) {
    console.error('Error importing potreros data:', error);
    throw error;
  } finally {
    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

// Execute if run directly
if (require.main === module) {
  importPotrerosData().catch(error => {
    console.error('Failed to import potreros:', error);
    process.exit(1);
  });
}