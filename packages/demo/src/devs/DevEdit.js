import React from 'react';
import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';

export const DevEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
        </SimpleForm>
    </Edit>
);
