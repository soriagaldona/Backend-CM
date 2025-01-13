// src/utils/exportPotrerosData.ts
import { AppDataSource } from "./data-source";
import { PotreroEntity } from "../models/potrero.model";
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const exportPotrerosData = async (): Promise<string> => {
  try {
    // Initialize database connection if not initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const potreroRepository = AppDataSource.getRepository(PotreroEntity);

    // Get data using PostGIS function to convert geometry to GeoJSON
    const potreros = await potreroRepository.query(`
      SELECT 
        gid,
        id,
        potrero,
        pasto,
        id_retiro,
        area,
        ST_AsGeoJSON(geom)::json as geom
      FROM potreros
    `);

    // Create seeds directory if it doesn't exist
    const seedsDir = path.join(__dirname, '../seeds');
    if (!fs.existsSync(seedsDir)) {
      fs.mkdirSync(seedsDir, { recursive: true });
    }

    // Write to JSON file
    const seedFile = path.join(seedsDir, 'potreros-seed.json');
    fs.writeFileSync(seedFile, JSON.stringify(potreros, null, 2));

    console.log(`Successfully exported ${potreros.length} potreros to ${seedFile}`);
    return seedFile;
  } catch (error) {
    console.error('Error exporting potreros data:', error);
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
  exportPotrerosData().catch(error => {
    console.error('Failed to export potreros:', error);
    process.exit(1);
  });
}