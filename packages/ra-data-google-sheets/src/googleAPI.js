const GOOGLE_API_SCRIPT = 'https://apis.google.com/js/api.js';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
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

const loadClient = credentials => {
    return new Promise(resolve => {
        createGoogleApiScript(() => {
            window.gapi.load('client:auth2', () => {
                resolve(credentials);
            });
        });
    });
};

const initClient = ({ apiKey, clientId }) => {
    return window.gapi.client.init({
        apiKey,
        clientId,
        scope: SCOPE,
        discoveryDocs: DISCOVERY_DOCS,
    });
};

export const loadGoogleApi = credentials => {
    return loadClient(credentials).then(initClient);
};

export const login = () => {
    return new Promise((resolve, reject) => {
        const auth2Instance = window.gapi.auth2.getAuthInstance();
        if (auth2Instance.isSignedIn.get()) {
            resolve();
            return;
        }

        auth2Instance.isSignedIn.listen(() => {
            if (auth2Instance.isSignedIn.get()) {
                resolve();
            } else {
                reject();
            }
        });

        window.gapi.auth2.getAuthInstance().signIn();
    });
};

export const logout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    return Promise.resolve();
};
