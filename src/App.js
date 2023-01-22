import React, { Component } from 'react';

import Box from '@mui/material/Box';
import LogList from './LogList';
import SearchBox from './SearchBox';
import LogDialog from './LogDialog';


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            query:
            {
                date: "",
                category: "",
                message: ""
            },
            open: false
        };
    }

    onClickSearch = (query) => {
        console.log('clicked search')
        this.state = this.setState({
            query: query,
        });
        this.forceUpdate();
    }

    onClickClear = (query) => {
        console.log('clicked clear')
        this.state = this.setState({
            query: query,
        });
        this.forceUpdate();
    }

    onCloseDialog = () => {
        this.setState({
            open: !this.state.open
        })
    }

    onClickLog = (Log) => {
        this.setState({
            open: true
        })
    }

    render = () => {
        return (
            <Box
                sx={{
                    width: "100%",
                    margin: 3,
                    backgroundColor: 'white'
                }}>
                <h1> LogLite </h1>
                <SearchBox onClickSearch={this.onClickSearch} onClickClear={this.onClickClear} />
                <LogList query={this.state.query} onClickRow={this.onClickLog} />
                <LogDialog open={this.state.open}
                    onClose={this.onCloseDialog}
                />
            </Box>
        )
    }
}