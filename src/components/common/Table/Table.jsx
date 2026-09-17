import { useMemo, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./Table.css";

const CustomTable = ({
  columns,
  rows,
  emptyMessage,
  className = "",
}) => {
  const defaultColumn = useMemo(() => {
    return columns.find(
      (column) => column.defaultOrder
    );
  }, [columns]);

  const [order, setOrder] = useState(
    defaultColumn?.defaultOrder || "asc"
  );

  const [orderBy, setOrderBy] = useState(
    defaultColumn?.id || null
  );

  const handleSort = (column) => {
    const isAscending =
      orderBy === column.id && order === "asc";

    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(column.id);
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      if (!orderBy) {
        return 0;
      }

      const column = columns.find(
        (column) => column.id === orderBy
      );

      const valueA = column?.sortValue
        ? column.sortValue(a)
        : a[orderBy];

      const valueB = column?.sortValue
        ? column.sortValue(b)
        : b[orderBy];

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [rows, columns, orderBy, order]);

  return (
    <TableContainer
      component={Paper}
      className="custom-table-container"
    >
      <Table className={`custom-table ${className}`}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(column)}
                  >
                    {column.label}
                  </button>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedRows.length > 0 ? (
            sortedRows.map((row, index) => (
              <TableRow key={row.id || index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render
                      ? column.render(row)
                      : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;