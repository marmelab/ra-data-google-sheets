import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';

export const DevList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <ReferenceField
                label="Project"
                source="project_id"
                reference="projects"
            >
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);
