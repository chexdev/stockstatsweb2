import React, { useState, useEffect, useMemo } from "react";
import TableHistory from "./tables/TableHistory";
import axios from "axios";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import NavBar from "./navigation/NavBar";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ClosingChart from "./charts/ClosingChart";
import DatePickerCalendar from "./datepick/DatePicker";

//Stock History Table:
function History() {
  const columns = useMemo(
    () => [
      {
        // Second group - Details
        Header: "Stock History",
        // Second group columns
        columns: [
          {
            Header: "Date",
            accessor: "timestamp",
          },
          {
            Header: "Open",
            accessor: "open",
          },
          {
            Header: "High",
            accessor: "high",
          },
          {
            Header: "Low",
            accessor: "low",
          },
          {
            Header: "Close",
            accessor: "close",
          },
          {
            Header: "Volumes",
            accessor: "volumes",
          },
        ],
      },
    ],
    []
  );

  //set params from react-router-dom
  const params = useParams();
  // data state to store the API data. Its initial value is an empty array
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios(
        `http://fosapps01.qut.edu.au:3000/history?symbol=${params.symbol}`
      );
      setData(result.data);
    })();
  }, [params.symbol]);

  useEffect(() => {
    (async () => {
      const result = await axios(
        `http://fosapps01.qut.edu.au:3000/history?symbol=${params.symbol}&from=yyyy-mm-dd`
      );
      setDate(result.date);
    })();
  }, [params.symbol]);

  return (
    <div className="container">
      <NavBar />
      <div className="container text-center pt-3">
        <h3>
          Stock History for "<strong>{params.symbol}</strong>""
        </h3>
      </div>
      <div className="container pt-3 text-center">
        <p>
          Click on the search boxes below to filter stock{" "}
          <strong>{params.symbol}</strong>:
        </p>
      </div>

      <div className="container">
        <Styles>
          <TableHistory columns={columns} data={data} date={date} />
        </Styles>
      </div>
      <div className="container text-center">
        <h3>Closing Price Chart</h3>
      </div>
      <ClosingChart data={data} />
      <div>
        <Button
          colour="info"
          size="sm"
          className="mt-3 btn-dark"
          href="http://fosapps01.qut.edu.au:3000/all"
          target="_blank"
        >
          {" "}
          Go to Stocks API
        </Button>
      </div>
    </div>
  );
}

export default History;

//Table styling
const Styles = styled.div`
  padding: 1rem;
  display: block;
  max-width: 100%;

  table {
    border-spacing: 0;
    width: 100%
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
    tbody tr {
      :nth-of-type(odd) {
        background-color: ;
      }
      :hover {
        background-color: white;
      }
    }
    thead > tr {
      background-color: #B7C3DA;
    }
  }
`;
