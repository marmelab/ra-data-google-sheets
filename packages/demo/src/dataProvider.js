import {
    googleSheetsDataProvider,
    googleFormDataProvider,
} from 'ra-data-google-sheets';

const resourcesMap = {
    devs: googleSheetsDataProvider(
        '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU'
    ),
    projects: googleSheetsDataProvider(
        '1cagTLWhyPnlFpgCcu19W4O0wBCzXxEyDb5yBK_jg-PU'
    ),
    answers: googleFormDataProvider(
        '1NY8Og8RLMWyEzC9fyZxF2Q5_rwQoJg_sgU-PTJtM_Xk'
    ),
};

// Only used to configure the proxy
const fakeDataProvider = {
    create: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
    deleteMany: () => Promise.resolve(null),
    getList: () => Promise.resolve(null),
    getMany: () => Promise.resolve(null),
    getManyReference: () => Promise.resolve(null),
    getOne: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    updateMany: () => Promise.resolve(null),
};

export const dataProvider = new Proxy(fakeDataProvider, {
    get: (target, name) => {
        return (resource, params) => {
            let resourceDataProvider = resourcesMap[resource];

            if (!resourceDataProvider) {
                throw new Error(`Invalid resource "${resource}"`);
            }

            if (!resourceDataProvider[name]) {
                throw new Error(
                    `Invalid action "${name}" for resource "${resource}"`
                );
            }

            return resourceDataProvider[name](resource, params);
        };
    },
});
