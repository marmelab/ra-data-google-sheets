import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const AnswerList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <DateField source="horodateur" />
            <TextField source="firstname" />
        </Datagrid>
    </List>
);
