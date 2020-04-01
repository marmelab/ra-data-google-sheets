import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Helmet } from 'react-helmet';
import { googleSheetsDataProvider } from 'ra-data-google-sheets';

import { authProvider } from './authProvider';
import { devs } from './devs';

const dataProvider = googleSheetsDataProvider();

const App = () => {
    const { PAGE_TITLE } = global.CONFIG;

    return (
        <>
            <Helmet>
                <title>{PAGE_TITLE}</title>
            </Helmet>
            <Admin authProvider={authProvider} dataProvider={dataProvider}>
                <Resource name="devs" {...devs} />
            </Admin>
        </>
    );
};

export default App;
