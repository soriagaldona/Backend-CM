// src/sharepoint/sharepoint.config.ts

export const SharePointConfig = {
    // Base SharePoint site URL
    siteUrl: 'https://mbarete.sharepoint.com/sites/DemoMbarete',
    
    // App registration credentials
    clientId: '1927d9a5-799c-4cfd-9fe8-83c122224e1f',
    clientSecret: '2NKbLfUpVi/E2yv8nvIaSKGg1m41MVhQpxK1h8uYX+Y=',
    
    // Your tenant/realm ID 
    realmId: '39eebd86-853a-4633-97b8-9b84fd01ad12',
    
    // The resource identifier for SharePoint Online
    resource: '00000003-0000-0ff1-ce00-000000000000/mbarete.sharepoint.com@39eebd86-853a-4633-97b8-9b84fd01ad12',
    
    // The token endpoint for authentication
    tokenEndpoint: 'https://accounts.accesscontrol.windows.net/39eebd86-853a-4633-97b8-9b84fd01ad12/tokens/OAuth/2'
};

// Constants for SharePoint REST API endpoints
export const SharePointEndpoints = {
    base: '/_api',
    lists: '/_api/web/lists',
    testConnection: '/_api/web',
    getListByTitle: (title: string) => `/_api/web/lists/GetByTitle('${title}')`
};