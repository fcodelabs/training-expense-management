import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TableComponentProps {
    rows: Array<Expensearray>;
}
interface Expensearray {
    exname: string;
    excost: number;
}

function TableComponent({ rows }: TableComponentProps) {
    return (
        <>
            <CssBaseline />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 330 }} size="small" aria-label="a dense table">
                    <TableBody>
                        {rows.map((row: Expensearray, index: number) => (
                            <TableRow
                                key={index + row.exname}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.exname}
                                </TableCell>
                                <TableCell align="right">
                                    <Box
                                        sx={{
                                            width: "100px",
                                            maxWidth: 500,
                                            backgroundColor:
                                                row.exname === "Income" ? "#85e085" : "#f36d6d",
                                            color: "white",
                                            textAlign: "center",
                                            float: "right",
                                            borderRadius: 10,
                                            paddingTop: "5px",
                                        }}
                                    >
                                        <Typography variant="subtitle2" gutterBottom>
                                            Rs.{row.excost}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TableComponent;
