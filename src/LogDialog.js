import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
            <Stack spacing={2}
                sx = {{
                }}
                 >
                <Item>
                    <TextField id="txtId" label="Id" variant="standard" value={log.id} />
                </Item>
                <Item>
                    <TextField label="Time" variant="standard" value={log.timestamp} />
                </Item>
                <Item>
                    <TextField label="Category" variant="standard" value={log.category} />
                </Item>
                <Item>
                    <TextField fullWidth={true} label="Message" variant="standard" multiline={true} minRows={30} rows={30} value={log.message} 
                     sx = {{
                        width: 600
                    }}
                    />
                </Item>
            </Stack>
        </Dialog>
    );
}

LogDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
};