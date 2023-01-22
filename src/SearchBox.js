import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class SearchBox extends React.Component
{
    render() {
        return (
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
                <TextField id="txtCategory" label="Category" variant="standard" />
                <TextField id="txtMessage" label="Message" variant="standard" />
                <Button variant="contained">Search</Button>
            </Box>
        )
    }
}