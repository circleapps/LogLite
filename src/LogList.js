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

    getParams = () => {
        const {query} = this.props;
        console.log(query.category);
        console.log(query.message);
        var queryString = "";
        var first = true;
        if (query.date) {
            var tzOffset = (new Date()).getTimezoneOffset() * 60000;
            var localDate = new Date(query.date.toDate() - tzOffset);
            queryString += "date=" + localDate.toISOString().split('T')[0];
            first = false;
        }
        if (query.message) {
            if (first) {
                first = false;
            } else {
                queryString += "&";
            }
            queryString += "message=" + query.message;
        }
        if (query.category) {
            if (first) {
                first = false;
            } else {
                queryString += "&";
            }
            queryString += "category=" + query.category;
        }
        console.log(queryString);
        return queryString;
    }

    retrieveData = () => {
        const params = this.getParams(); 
        axios.get('http://localhost:3000/log?' + params)
            .then(res => {
                const logs = res.data.logs;
                this.setState({logs});
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.retrieveData();
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.query != this.props.query) this.retrieveData();
    }

    onClickRow = (log)  =>
    {
        this.props.onClickRow(log);
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
                            <TableCell align="left">Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        logs.map((log,i)=> (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={(e)=> {this.onClickRow(log)}} >
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