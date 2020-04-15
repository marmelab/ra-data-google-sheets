import { processSheet } from './formatDataForReactAdmin';
import { processForm } from './formatDataForGoogleSheets';

const GOOGLE_SHEETS_DOC_ID = '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU';

const getResourceRows = async resource => {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A:Z`,
    });

    return processSheet(response.result.values);
};

const getResourceHeaders = async resource => {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A1:Z1`,
    });

    return processSheet(response.result.values).headers;
};

const countResourceRows = async resource => {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A1:A1000`,
    });

    return processSheet(response.result.values).total;
};

const appendResourceRows = async (resource, rows) => {
    return await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A1`,
        valueInputOption: 'RAW',
        resource: {
            values: rows,
        },
    });
};

export const googleSheetsDataProvider = () => {
    return {
        create: async (resource, { data: formData }) => {
            const headers = await getResourceHeaders(resource);
            const total = await countResourceRows(resource);

            const newId = total + 1; // Auto-Increment
            const values = processForm(headers, newId, formData);

            await appendResourceRows(resource, values);

            return {
                data: { ...formData, id: newId },
            };
        },
        delete: () => Promise.resolve(null),
        deleteMany: () => Promise.resolve(null),
        getList: async resource => {
            const result = await getResourceRows(resource);

            return {
                data: result.data,
                total: result.total,
            };
        },
        getMany: async resource => {
            const result = await getResourceRows(resource);

            return {
                data: result.data,
                total: result.total,
            };
        },
        getManyReference: () => Promise.resolve(null),
        getOne: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
        updateMany: () => Promise.resolve(null),
    };
};
