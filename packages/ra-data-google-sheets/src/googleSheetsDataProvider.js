import { processSheet } from './processGoogleSheetsData';

const GOOGLE_SHEETS_DOC_ID = '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU';

export const googleSheetsDataProvider = () => {
    return {
        create: async (resource, { data }) => {
            const response = await window.gapi.client.sheets.spreadsheets.values.get(
                {
                    spreadsheetId: GOOGLE_SHEETS_DOC_ID,
                    range: `${resource}!A1:Z1`,
                }
            );

            const headers = response.result.values[0];

            const values = headers.map(header => {
                if (header === 'id') {
                    return '';
                }
                return data[header];
            });

            await window.gapi.client.sheets.spreadsheets.values
                .append({
                    spreadsheetId: GOOGLE_SHEETS_DOC_ID,
                    range: `${resource}!A1`,
                    resource: {
                        values,
                    },
                })
                .then(response => {
                    var result = response.result;
                    console.log(
                        `${result.updates.updatedCells} cells appended.`
                    );
                });
        },
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
        getMany: async resource => {
            const response = await window.gapi.client.sheets.spreadsheets.values.get(
                {
                    spreadsheetId: GOOGLE_SHEETS_DOC_ID,
                    range: `${resource}!A:Z`,
                }
            );

            return processSheet(response.result.values);
        },
        getManyReference: () => Promise.resolve(null),
        getOne: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
        updateMany: () => Promise.resolve(null),
    };
};
