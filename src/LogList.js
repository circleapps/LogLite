import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';


class LogList extends Component {
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        logs.map((log,i)=> (
                            <tr key={i}>
                                <td>{log.id}</td>
                                <td>{log.timestamp}</td>
                                <td>{log.cat}</td>
                                <td>{log.msg}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            
        );

    }
}

export default LogList;
