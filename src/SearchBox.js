import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SearchBox({onClickSearch}) {
    const [date, setDate] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [message, setMessage] = React.useState(null);

    function onSearch() {
        console.log('onSearch')
        console.log(date);
        console.log(category);
        console.log(message);
        onClickSearch({
            date: date,
            category: category,
            message: message
        });
    }
    return (
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <TextField id="txtCategory" label="Category" variant="standard" 
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />
            <TextField id="txtMessage" label="Message" variant="standard" 
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <Button variant="contained" onClick={onSearch}> Search</Button> 
        </Box>
    )
}