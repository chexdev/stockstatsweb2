import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//Mock Data

// const data = [
//   {
//     name: "Page A",
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default function ClosingChart() {
  const closing = useMemo(
    () => [
      {
        closing: [
          {
            date: "timestamp",
            close: "close",
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

  // Using useEffect to call the API once mounted and set the data

  // useEffect(() => {
  //   (async () => {
  //     const result = await axios(
  //       `http://fosapps01.qut.edu.au:3000/history?symbol=${params.symbol}&from=yyyy-mm-dd`
  //     );
  //     setData(result.data);
  //   })();
  // }, [params.symbol]);

  return (
    <ResponsiveContainer aspect={2.5}>
      <LineChart
        width={500}
        height={300}
        closing={closing}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Closing Price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
