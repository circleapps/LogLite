import React, { Component } from 'react';
import axios from 'axios';

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
            <ul> 
            {
                logs.map((log,i)=> (
                    <li key={i}> { `${log.timestamp} ${log.cat} ${log.msg}` } </li>
                ))
            }
            </ul>
        );

    }
}

export default LogList;
