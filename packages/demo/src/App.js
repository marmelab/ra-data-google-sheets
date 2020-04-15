import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Helmet } from 'react-helmet';

import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';

import { answers } from './answers';
import { devs } from './devs';
import { projects } from './projects';

const App = () => {
    const { PAGE_TITLE } = global.CONFIG;

    return (
        <>
            <Helmet>
                <title>{PAGE_TITLE}</title>
            </Helmet>
            <Admin authProvider={authProvider} dataProvider={dataProvider}>
                <Resource name="answers" {...answers} />
                <Resource name="devs" {...devs} />
                <Resource name="projects" {...projects} />
            </Admin>
        </>
    );
};

export default App;
