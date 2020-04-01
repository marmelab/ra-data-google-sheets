import { processSheet } from './processGoogleSheetsData';

const GOOGLE_SHEETS_DOC_ID = '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU';

export const googleSheetsDataProvider = () => {
    return {
        create: () => Promise.resolve(null),
        delete: () => Promise.resolve(null),
        deleteMany: () => Promise.resolve(null),
        getList: async resource => {
            const response = await window.gapi.client.sheets.spreadsheets.values.get(
                {
                    spreadsheetId: GOOGLE_SHEETS_DOC_ID,
                    range: `${resource}!A:Z`,
                }
            );

            return processSheet(response.result.values);
        },
        getMany: () => Promise.resolve(null),
        getManyReference: () => Promise.resolve(null),
        getOne: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
        updateMany: () => Promise.resolve(null),
    };
};
