const GOOGLE_API_SCRIPT = 'https://apis.google.com/js/api.js';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

const createGoogleApiScript = onload => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = GOOGLE_API_SCRIPT;
    script.onload = onload;
    document.body.appendChild(script);
};

export const loadGoogleApi = ({ apiKey }) => {
    return new Promise(resolve => {
        createGoogleApiScript(() => {
            window.gapi.load('client', () => {
                resolve();
            });
        });
    }).then(() => {
        return window.gapi.client.init({
            apiKey,
            scope: SCOPE,
            discoveryDocs: DISCOVERY_DOCS,
        });
    });
};
