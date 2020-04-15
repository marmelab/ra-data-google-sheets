import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Helmet } from 'react-helmet';
import {
    googleAPIAuthProvider,
    googleSheetsDataProvider,
} from 'ra-data-google-sheets';

import { devs } from './devs';
import { projects } from './projects';

const authProvider = googleAPIAuthProvider();
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
                <Resource name="projects" {...projects} />
            </Admin>
        </>
    );
};

export default App;
