import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";

import styled from "styled-components";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addIn } from "../slice/expenseSlice";
import { selectTotalExpense, selectTotalIncome } from "../slice/expenseSlice";
import formatToCurrency from "../utils/currency";

const ExIncome = styled.div`
  width: 32%;
  height: 100px;
  float: left;
  margin-left: 20px;
  background-color: #c2d6d6;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 94%;
  }

  @media (max-width: 480px) {
    width: 330px;
  }
`;
const ExRemaining = styled.div`
  width: 29%;
  height: 100px;
  /* border: 1px solid black; */
  float: left;
  margin-left: 40px;
  background-color: rgb(176, 252, 227);
  border-radius: 10px;

  @media (max-width: 1024px) {
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-top: 10px;
    width: 94%;
  }

  @media (max-width: 480px) {
    width: 330px;
    margin-left: 20px;
    margin-top: 10px;
  }
`;
const ExSpent = styled.div`
  width: 28.5%;
  height: 100px;
  /* border: 1px solid black; */
  float: left;
  margin-left: 40px;
  background-color: rgb(2, 173, 173);
  border-radius: 10px;

  @media (max-width: 1024px) {
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-top: 10px;
    width: 94%;
  }

  @media (max-width: 480px) {
    width: 330px;
    margin-left: 20px;
    margin-top: 10px;
  }
`;

const Edit = styled.div`
  float: right;
  margin-right: 20px;
  margin-top: -35px;
`;

function ExpenseStatus() {
    const [isClick, setIsClick] = useState(false);
    const [incost, setInCost] = useState("");

    const dispatch = useDispatch();
    const expense = useSelector(selectTotalExpense);
    const income = useSelector(selectTotalIncome);

    const totIncome = formatToCurrency(income.totalIncome);
    const totExpense = formatToCurrency(expense.totalExpense);
    const totRemaining = formatToCurrency(income.totalIncome - expense.totalExpense);

    const buttonClick = () => {
        if (incost !== "") {
            dispatch(addIn({ income: "Income", incost }));
            setInCost("");
        }
        setIsClick((current) => !current);
    };
    return (
        <>
            <CssBaseline />
            <div className="cexStatus">
                <ExIncome>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 500,
                            marginLeft: "20px",
                            marginTop: "30px",
                        }}
                    >
                        {!isClick && (
                            <Typography variant="subtitle1" gutterBottom>
                                Income: Rs {totIncome}
                            </Typography>
                        )}
                    </Box>
                    {isClick && (
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": {
                                    m: 1,
                                    width: "20ch",
                                    marginTop: "-20px",
                                    marginLeft: "20px",
                                },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="standard-basic"
                                label="Add Income"
                                variant="standard"
                                name="incost"
                                value={incost}
                                onChange={(e) => setInCost(e.target.value)}
                            />
                        </Box>
                    )}
                    <Edit>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={buttonClick}>
                                {isClick ? "Save" : "Edit"}
                            </Button>
                        </Stack>
                    </Edit>
                </ExIncome>
                <ExRemaining>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 500,
                            marginLeft: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Remaining: Rs {totRemaining}
                        </Typography>
                    </Box>
                </ExRemaining>
                <ExSpent>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 500,
                            marginLeft: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Spent: Rs {totExpense}
                        </Typography>
                    </Box>
                </ExSpent>
            </div>
        </>
    );
}

export default ExpenseStatus;
