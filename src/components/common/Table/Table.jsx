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
  return (
    <TableContainer component={Paper}>
      <Table className={`custom-table ${className}`}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
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