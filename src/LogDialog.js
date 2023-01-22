import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';


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
            <Box sx={{
                    width: "300",
                    margin: 3
                }}>
                <h1> Log #{log.id} </h1>
                <h1> Time {log.timestamp} </h1>
                <h1> Category {log.category} </h1>
                <h1> Message {log.message} </h1>
            </Box>
        </Dialog>
    );
}

LogDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
};