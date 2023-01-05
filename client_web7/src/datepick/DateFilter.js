import React, { useState } from "react";
import DatePickerCalendar from "./DatePicker";

const DateFilter = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //called when a user selects filter start-date
  const handleStartDate = (date) => {
    setStartDate(date);
  };

  //called when a user selects filter end-date
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  // Filter table by selected start-date and end-date
  const handleFilterByDate = () => {
    if (startDate && endDate) {
      props.setFilter("date", [startDate, endDate]);
    }
  };

  // Handles all calls to filter the table <-- attached to onClick event of "apply filter button" -->
  const applyFilter = () => {
    if (startDate && endDate) {
      handleFilterByDate();
    }

    if ((!startDate && endDate) || (startDate && !endDate)) {
      window.alert("Please Make sure you select start-date and end-date");
    }
  };

  return (
    <div>
      {/** Datepicker section */}
      <div className="filterParameters" id="filterParameters">
        <div className="datePickerWrapper">
          <div className="Datepicker-grid-container">
            <div className="container">
              <div className="startDate">
                Date From:{" "}
                <div className="datePickerLabel">
                  {startDate ? startDate.toLocaleDateString("fr-CA") : null}
                </div>
                <DatePickerCalendar
                  handleDateChange={handleStartDate}
                  date={startDate}
                />
              </div>
              <div className="endDate">
                Date To:{" "}
                <div className="datePickerLabel">
                  {endDate ? endDate.toLocaleDateString("fr-CA") : null}
                </div>
                <DatePickerCalendar
                  handleDateChange={handleEndDate}
                  date={endDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="apply-filter">
          <button
            onClick={applyFilter}
            className="applyFilter-btn"
            id="applyFilter-btn"
          >
            Apply Filter{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
