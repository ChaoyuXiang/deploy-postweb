import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function DateFilter() {

    const [date,setDate] = React.useState('');

    const userID = useSelector(state => state.userID);

    const handleSubmit = ()=>{
        if(date!== '') {
            console.log({
                date: date.toISOString(),
                id : userID
            });
        }
        
    }

    return (
        <div style = {{marginBottom : '0', height :'60px'}}>
        <button style = {{width : '15%'}}
        onClick = {handleSubmit}>Filter</button>
        <DatePicker
        selected={date}
        onChange={setDate}
       />
        </div>
    )
}