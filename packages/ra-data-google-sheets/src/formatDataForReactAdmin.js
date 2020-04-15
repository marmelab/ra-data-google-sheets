export const processRow = (headers, row) => {
    return row.reduce((acc, cur, index) => {
        acc[headers[index]] = cur;
        return acc;
    }, {});
};

const processRows = ([headers, ...rows]) => {
    return {
        headers,
        data: rows.map(row => processRow(headers, row)),
    };
};

export const processSheet = rows => {
    const processedData = processRows(rows);

    return {
        data: processedData.data,
        headers: processedData.headers,
        total: processedData.data.length,
    };
};
