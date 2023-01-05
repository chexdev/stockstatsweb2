import React, { useState, createRef, forwardRef } from "react";
import DatePicker from "react-datepicker"; //import reat-datepicker module
import "react-datepicker/dist/react-datepicker.css"; //import reat-datepicker module css
import { FiCalendar } from "react-icons/fi"; //import calendar icon from reat-icon

/**
 * Customise input component for the datepicker
 * replace the default date picker component with with a calendar icon
 */
const DatePickerCustomInput = forwardRef(({ onClick }, ref) => (
  <div className="calendar_icon">
    <FiCalendar onClick={onClick} />
  </div>
));

const ref = createRef(); // add a Dom ref to the new Component to avoid Dom reffrence Error

//DatePickerCalender Component: 
const DatePickerCalendar = (props) => {
  return (
    <div className="datepicker" style={style}>
      <DatePicker
        selected={props.date}
        onChange={props.handleDateChange}
        customInput={<DatePickerCustomInput ref={ref} />}
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
};

export default DatePickerCalendar;

const style = {
  display: "inline-block",
  marginLeft: "6px",
  fontSize: "1.5em",
  color: "purple",
  cursor: "pointer",
};
