import React, { useMemo, useAsyncDebounce } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateFilter from "../datepick/DateFilter";
import { useTable, useFilters, useGlobalFilter } from "react-table"; // import react-table Hooks including useFilters and useGlobalFilter

//Table component below:
function TableHistory({ columns, data }) {
  //Apply table date filter
  const filterTypes = useMemo(
    () => ({
      dateFilter: (rows, id, filterValue) => {
        return (rows = rows.filter((row) => {
          return (
            new Date(row.values.date) >= filterValue[0] &&
            new Date(row.values.date) <= filterValue[1]
          );
        }));
      },
    }),
    []
  );
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    visibleColumns,
    setGlobalFilter,
    preGlobalFilteredRows,
    setFilter,
    dispatch,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    // useFilters,
    useGlobalFilter
  );

  // cap no. of table rows at 20
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      {/* //Filter Component */}
      <DateFilter
        setFilter={setFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        dispatch={dispatch}
      />

      {/* //Table Component */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            ></th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

export default TableHistory;
