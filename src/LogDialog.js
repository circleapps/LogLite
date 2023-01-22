import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

import Paper from '@mui/material/Paper';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { bottom } from '@popperjs/core';


export default function LogDialog(props) {
    const { onClose, selectedValue, open, log } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>View Log</DialogTitle>
            <DialogContent>
                <TextField label="ID" variant="standard" value={"#" + log.id} 
                    sx = {{ width: 550, paddingBottom:3 }}
                 />
                <TextField label="Time" variant="standard" value={log.timestamp} 
                    sx = {{ width: 550, paddingBottom:3 }}
                />
                <TextField label="Category" variant="standard" value={log.category} 
                    sx = {{ width: 550, paddingBottom:3 }}
                />
                <TextField label="Message" variant="standard" multiline={true} value={log.message} minRows={32}
                    sx = {{ width: 550, paddingBottom:3 }}
                />
            </DialogContent>
        </Dialog>
    );
}

LogDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
};