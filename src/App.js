
import React, { Component } from 'react';

import Box from '@mui/material/Box';
import LogList from './LogList';
import SearchBox from './SearchBox';


export default function App() {
    onClickSearch() {
         console.log('clicked search')
    }
    return (
        <Box
            sx={{
                width: "100%",
                margin: 3,
                backgroundColor: 'white'
            }}>
            <h1> LogLite </h1>
            <SearchBox onClickSearch={onClickSearch}/>
            <LogList />
        </Box>
    )
}