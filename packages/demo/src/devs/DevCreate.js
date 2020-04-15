import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const DevCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
        </SimpleForm>
    </Create>
);
