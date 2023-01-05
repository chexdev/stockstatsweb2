import React, { useState, useEffect, useMemo } from "react";
import TableMain from "./tables/TableMain";
import axios from "axios";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

import NavBar from "./navigation/NavBar";
import Header from "./components/Header";

function Home() {
  const columns = useMemo(
    () => [
      {
        // Second group - Details
        Header: "Stock Search",
        // Second group columns
        columns: [
          {
            Header: "Symbol",
            accessor: "symbol",
            Cell: (props) => (
              <a href={`/history/${props.value}`}>{props.value}</a>
            ),
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Industry",
            accessor: "industry",
          },
        ],
      },
    ],
    []
  );
  // data state to store the API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("http://fosapps01.qut.edu.au:3000/all");
      setData(result.data);
    })();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="container">
        <Header title="Daily Stock Market Statistics" />
      </div>
      <div className="container text-center pt-3">
        <h3>Stock Filter</h3>
      </div>
      <div class="container pt-3">
        <h5>Filter stocks using the search boxes below:</h5>
      </div>
      <Styles>
        <TableMain columns={columns} data={data} />
      </Styles>
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

export default Home;

//Table styling
const Styles = styled.div`
  padding: 1rem;
  display: block;
  max-width: 100%;

  table {
    border-spacing: 0;
    width: 100%
    border: 2px solid grey;

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
        background-color: #efefef;
      }
      :hover {
        background-color: yellow;
      }
    }
    thead > tr {
      background-color: #B7C3DA;
    }
  }
`;
