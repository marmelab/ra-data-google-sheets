const processRowHeader = headerRow => {
    return headerRow.map(value => value.formattedValue);
};

const processRow = (headers, row) => {
    return row.reduce((acc, cur, index) => {
        acc[headers[index]] = cur.formattedValue;
        return acc;
    }, {});
};

const processRows = ([headerRow, ...otherRows]) => {
    const headers = processRowHeader(headerRow.values);
    const rows = otherRows.map(row => row.values);

    return rows.map(row => processRow(headers, row));
};

export const processSheet = sheet => {
    const {
        properties: { title: resource },
        data,
    } = sheet;

    const processedData = processRows(data[0].rowData);

    return {
        resource,
        data: processedData,
        total: processedData.length,
    };
};
