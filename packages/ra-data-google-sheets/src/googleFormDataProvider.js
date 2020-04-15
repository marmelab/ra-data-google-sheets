import { processSheet, processRow } from './formatDataForReactAdmin';

export const googleFormDataProvider = spreadsheetId => {
    const getResourceRows = async resource => {
        const response = await window.gapi.client.sheets.spreadsheets.values.get(
            {
                spreadsheetId,
                range: `${resource}`,
            }
        );

        return processSheet(response.result.values);
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

    return {
        getList: async resource => {
            const result = await getResourceRows(resource);

            const data = result.data.map((rowData, index) => ({
                id: index,
                ...rowData,
            }));

            return {
                data: data,
                total: result.total,
            };
        },
        getMany: async resource => {
            const result = await getResourceRows(resource);

            const data = result.data.map((rowData, index) => ({
                id: index,
                ...rowData,
            }));

            return {
                data: data,
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
    };
};
