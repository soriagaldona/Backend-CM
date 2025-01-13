// src/sharepoint/sharepoint.controller.ts

import { Request, Response } from 'express';
import { sharepointService } from './sharepoint.service';

export class SharePointController {
    public async testConnection(req: Request, res: Response): Promise<void> {
        try {
            const isConnected = await sharepointService.testConnection();
            if (isConnected) {
                res.status(200).json({ 
                    success: true, 
                    message: 'Successfully connected to SharePoint' 
                });
            } else {
                res.status(500).json({ 
                    success: false, 
                    message: 'Failed to connect to SharePoint' 
                });
            }
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: 'Error testing SharePoint connection',
                error: error.message 
            });
        }
    }
}

// Export a singleton instance
export const sharepointController = new SharePointController();