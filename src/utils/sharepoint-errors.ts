// src/utils/sharepoint-errors.ts
export class SharePointError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public details?: any
    ) {
        super(message);
        this.name = 'SharePointError';
    }
}

export function handleSharePointError(error: any): SharePointError {
    if (error instanceof SharePointError) {
        return error;
    }

    // Handle axios errors
    if (error.response) {
        const statusCode = error.response.status;
        const message = error.response.data?.error?.message?.value || 
                       error.response.data?.error || 
                       'SharePoint API error';
        
        return new SharePointError(message, statusCode, error.response.data);
    }

    // Handle network errors
    if (error.request) {
        return new SharePointError('Network error connecting to SharePoint', 503);
    }

    // Handle other errors
    return new SharePointError(error.message || 'Unknown SharePoint error', 500);
}