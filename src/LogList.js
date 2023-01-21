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
        console.log(this.state.logs.length)
        const logs = this.state.logs;
        return React.createElement(
                "ul",
                null,
                logs.map((log,i)=>
                {
                    console.log(log);
                    return React.createElement(
                        "li",
                        {key:i},
                        `${log.timestamp} ${log.cat} ${log.msg}`
                    );
                })
            );
    }
}

export default LogList;
