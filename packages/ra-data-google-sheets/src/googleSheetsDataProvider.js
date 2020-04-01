import { fetchUtils } from 'ra-core';

import { processSheet } from './processGoogleSheetsData';

const GOOGLE_SHEETS_DOC_ID = '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU';
const GOOGLE_SHEETS_API_KEY = 'AIzaSyAg7KMhv203LygtsIjSH4w_Qm7vRpeyAEA';

const defaultBaseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_DOC_ID}`;
const basePath = `?key=${GOOGLE_SHEETS_API_KEY}&includeGridData=true`;

export const googleSheetsDataProvider = (baseUrl = defaultBaseUrl) => {
    return {
        create: () => Promise.resolve(null),
        delete: () => Promise.resolve(null),
        deleteMany: () => Promise.resolve(null),
        getList: async () => {
            const url = `${baseUrl}${basePath}&fields=sheets(data%2FrowData%2Fvalues%2FformattedValue%2Cproperties%2Ftitle)`;

            const { json } = await fetchUtils.fetchJson(url);
            console.log(json);
            return processSheet(json.sheets[0]);
        },
        getMany: () => Promise.resolve(null),
        getManyReference: () => Promise.resolve(null),
        getOne: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
        updateMany: () => Promise.resolve(null),
    };
};
