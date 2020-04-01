const GOOGLE_SHEETS_API_KEY = 'AIzaSyAg7KMhv203LygtsIjSH4w_Qm7vRpeyAEA';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

export const loadGoogleApi = () => {
    return new Promise(resolve => {
        window.gapi.load('client', () => {
            resolve();
        });
    }).then(() => {
        return window.gapi.client.init({
            apiKey: GOOGLE_SHEETS_API_KEY,
            scope: SCOPE,
            discoveryDocs: DISCOVERY_DOCS,
        });
    });
};
