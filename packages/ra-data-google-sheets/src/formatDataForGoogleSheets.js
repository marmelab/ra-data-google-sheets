export const processForm = (headers, newId, formData) => {
    const values = headers.map(header => {
        if (header === 'id') {
            return newId;
        }
        return formData[header] || '';
    });

    return [values];
};
