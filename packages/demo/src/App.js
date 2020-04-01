import React from 'react';
import { Admin } from 'react-admin';
import { Helmet } from 'react-helmet';

const dataProvider = () => {};

const App = () => {
    const { PAGE_TITLE } = global.CONFIG;

    return (
        <>
            <Helmet>
                <title>{PAGE_TITLE}</title>
            </Helmet>
            <Admin dataProvider={dataProvider} />
        </>
    );
};

export default App;
