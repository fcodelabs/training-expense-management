import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";

import styled from "styled-components";
import TableComponent from "./tableComponent";
//import { Expense } from "../../Data/expenseData";
import { getExIn, selectExpense } from "../../slice/expenseSlice";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterType, SearchArray } from "../types/exTableTypes";

const HistoryPtag = styled.div`
  margin-left: 20px;
  font-size: 25px;

  @media (max-width: 480px) {
    text-align: center;
    margin-left: 0;
  }
`;
const HistoryTable = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  width: 95.3%;

  @media (max-width: 1024px) {
    width: 94%;
  }

  @media (max-width: 768px) {
    width: 94%;
  }

  @media (max-width: 480px) {
    width: 330px;
  }
`;
const HistorySearch = styled.div`
  margin-left: 20px;

  @media (max-width: 1024px) {
    width: 94%;
  }

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
  const [filterArray, setFilterArray] = useState<Array<FilterType>>([]);

  const dispatch = useDispatch();
  const userExpenseIncome = useSelector(selectExpense);

  const search = (rows: Array<FilterType>) => {
    console.log(rows)
    return rows.filter((row: FilterType) =>
      row.exname.toLowerCase().includes(innerValue.trim())
    );
  };

  useEffect(() => {
    setFilterArray(userExpenseIncome)
  }, [userExpenseIncome]);

  useEffect(() => {
    setFilterArray(search(userExpenseIncome))
  }, [innerValue])

  useEffect(() => {
    dispatch(getExIn());
  }, []);

  return (

    <>
      <CssBaseline />
      <div className="exhistory">
        <HistoryPtag>
          <p>History</p>
        </HistoryPtag>
        <HistorySearch>
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
        </HistorySearch>
        <HistoryTable>
          <TableComponent rows={filterArray} />
        </HistoryTable>

      </div>
    </>
  );
}

export default ExpenseTable;
