import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";

import styled from "styled-components";
import TableComponent from "./tableComponent";
import { Expense } from "../../Data/expenseData";

import { useState } from "react";

const Hp = styled.div`
  margin-left: 20px;
  font-size: 25px;

  @media (max-width: 480px) {
    text-align: center;
    margin-left: 0;
  }
`;
const Htable = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  width: 95.3%;

  @media (max-width: 768px) {
    width: 94%;
  }

  @media (max-width: 480px) {
    width: 330px;
  }
`;
const Hsearch = styled.div`
  margin-left: 20px;

  @media (max-width: 768px) {
    width: 94%;
  }

  @media (max-width: 480px) {
    width: 330px;
    margin-top: -10px;
  }
`;

function ExpenseTable() {
    const [innerValue, setInnerValue] = useState("");

    const search = (rows: any) => {
        return rows.filter((row: any) =>
            row.exname.toLowerCase().includes(innerValue)
        );
    };
    return (
        <>
            <CssBaseline />
            <div className="exhistory">
                <Hp>
                    <p>History</p>
                </Hp>
                <Hsearch>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { width: "95.3vw", maxWidth: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-size-small"
                            placeholder="Type to Search ..."
                            size="small"
                            value={innerValue}
                            onChange={(e) => setInnerValue(e.target.value)}
                        />
                    </Box>
                </Hsearch>
                <Htable>
                    <TableComponent rows={search(Expense)} />
                </Htable>
            </div>
        </>
    );
}

export default ExpenseTable;
