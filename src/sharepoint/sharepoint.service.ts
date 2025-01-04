// src/sharepoint/sharepoint.service.ts

import axios from 'axios';
import { SharePointConfig, SharePointEndpoints } from './sharepoint.config';

export class SharePointService {
    private accessToken: string | null = null;

    constructor() {
        // Initialize service
    }

    private async getAccessToken(): Promise<string> {
        try {
            if (this.accessToken) {
                return this.accessToken;
            }

            console.log('Attempting to get access token from:', SharePointConfig.tokenEndpoint);
            
            const payload = {
                'grant_type': 'client_credentials',
                'client_id': `${SharePointConfig.clientId}@${SharePointConfig.realmId}`,
                'client_secret': SharePointConfig.clientSecret,
                'resource': SharePointConfig.resource
            };
            
            console.log('Token request payload:', JSON.stringify(payload, null, 2));

            const response = await axios.post(
                SharePointConfig.tokenEndpoint, 
                new URLSearchParams(payload), 
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            console.log('Token response:', JSON.stringify(response.data, null, 2));

            const accessToken = response.data.access_token;
            
            if (!accessToken || typeof accessToken !== 'string') {
                throw new Error('Invalid access token received from SharePoint');
            }

            this.accessToken = accessToken;
            return accessToken;

        } catch (error: any) {
            console.error('Detailed error getting SharePoint access token:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            throw new Error(`Failed to get SharePoint access token: ${error.message}`);
        }
    }

    private async getHeaders(): Promise<Record<string, string>> {
        const token = await this.getAccessToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose'
        };
    }

    public async testConnection(): Promise<boolean> {
        try {
            console.log('Testing SharePoint connection to:', `${SharePointConfig.siteUrl}${SharePointEndpoints.testConnection}`);
            
            const headers = await this.getHeaders();
            console.log('Request headers:', JSON.stringify(headers, null, 2));

            const response = await axios.get(
                `${SharePointConfig.siteUrl}${SharePointEndpoints.testConnection}`, 
                { headers }
            );

            console.log('SharePoint response:', {
                status: response.status,
                statusText: response.statusText,
                data: response.data
            });

            return response.status === 200;
        } catch (error: any) {
            console.error('Detailed SharePoint connection error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                url: error.config?.url
            });
            return false;
        }
    }
}

// Export a singleton instance
export const sharepointService = new SharePointService();