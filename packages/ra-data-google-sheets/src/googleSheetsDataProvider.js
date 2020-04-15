import { processSheet, processRow } from './formatDataForReactAdmin';
import { processForm } from './formatDataForGoogleSheets';

const GOOGLE_SHEETS_DOC_ID = '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU';

const getResourceRows = async resource => {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}`,
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

const appendResourceRow = async (resource, row) => {
    return await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A1`, // Automatically added at the end
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: row,
        },
    });
};

const getResourceRow = async (resource, id) => {
    const headers = await getResourceHeaders(resource);
    const rowNumber = parseInt(id, 10) + 1;

    const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A${rowNumber}:Z${rowNumber}`,
    });

    return processRow(headers, response.result.values);
};

const updateResourceRow = async (resource, id, row) => {
    const rowNumber = parseInt(id, 10) + 1;

    return await window.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_DOC_ID,
        range: `${resource}!A${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: row,
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

            await appendResourceRow(resource, values);

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
        getOne: async (resource, { id }) => {
            const result = await getResourceRow(resource, id);

            return {
                data: { id, ...result },
            };
        },
        update: async (resource, { id, data: formData }) => {
            const headers = await getResourceHeaders(resource);

            const values = processForm(headers, id, formData);

            await updateResourceRow(resource, id, values);

            return {
                data: { ...formData, id },
            };
        },
        updateMany: () => Promise.resolve(null),
    };
};
