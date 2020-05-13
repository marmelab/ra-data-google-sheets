import { processSheet, processRow } from './formatDataForReactAdmin';
import { processForm } from './formatDataForGoogleSheets';

export const googleSheetsDataProvider = spreadsheetId => {
    const getResourceRows = async (resource, params = {}) => {
        const response = await window.gapi.client.sheets.spreadsheets.values.get(
            {
                spreadsheetId,
                range: resource,
            }
        );

        const sheet = processSheet(response.result.values);

        if (params && params.pagination) {
            const { page, perPage } = params.pagination;
            const firstLineNumber = (page - 1) * perPage;
            const lastLineNumber = firstLineNumber + perPage;

            const paginatedValues = sheet.data.slice(
                firstLineNumber,
                lastLineNumber
            );

            return {
                ...sheet,
                data: paginatedValues,
            };
        }

        return sheet;
    };

    const getResourceHeaders = async resource => {
        const response = await window.gapi.client.sheets.spreadsheets.values.get(
            {
                spreadsheetId,
                range: `${resource}!A1:Z1`,
            }
        );

        return processSheet(response.result.values).headers;
    };

    const countResourceRows = async resource => {
        const response = await window.gapi.client.sheets.spreadsheets.values.get(
            {
                spreadsheetId,
                range: `${resource}!A1:A1000`,
            }
        );

        return processSheet(response.result.values).total;
    };

    const appendResourceRow = async (resource, row) => {
        return await window.gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId,
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

        const response = await window.gapi.client.sheets.spreadsheets.values.get(
            {
                spreadsheetId,
                range: `${resource}!A${rowNumber}:Z${rowNumber}`,
            }
        );

        return processRow(headers, response.result.values);
    };

    const updateResourceRow = async (resource, id, row) => {
        const rowNumberInRange = parseInt(id, 10) + 1; // Starts at 1

        return await window.gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${resource}!A${rowNumberInRange}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: row,
            },
        });
    };

    const deleteResourceRow = async (resource, id) => {
        const {
            result: { sheets },
        } = await window.gapi.client.sheets.spreadsheets.get({
            spreadsheetId,
        });

        const rowNumber = parseInt(id, 10);
        const sheetId = sheets.find(
            sheet => sheet.properties.title === resource
        ).properties.sheetId;

        return window.gapi.client.sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId,
                                startIndex: rowNumber,
                                endIndex: rowNumber + 1,
                                dimension: 'ROWS',
                            },
                        },
                    },
                ],
            },
        });
    };

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
        delete: async (resource, { id }) => {
            const res = await deleteResourceRow(resource, id);
            console.log(res);
            return { data: null };
        },
        deleteMany: () => Promise.resolve(null),
        getList: async (resource, params) => {
            const result = await getResourceRows(resource, params);

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
