const GOOGLE_SHEETS_API_KEY = 'AIzaSyAg7KMhv203LygtsIjSH4w_Qm7vRpeyAEA';

export const start = () => {
    global.gapi.client.init({
        apiKey: GOOGLE_SHEETS_API_KEY,
    });
};

export const load = () => {
    global.gapi.load('client', start);
};
