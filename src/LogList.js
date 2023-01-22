import React, { Component } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default class LogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/log')
            .then(res => {
                const logs = res.data.logs;
                this.setState({logs});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {logs} = this.state;
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Timestamp</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Log</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        logs.map((log,i)=> (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell>{log.id}</TableCell>
                                <TableCell>{log.timestamp}</TableCell>
                                <TableCell>{log.category}</TableCell>
                                <TableCell>{log.message.substr(0,30)}</TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        );

    }
}