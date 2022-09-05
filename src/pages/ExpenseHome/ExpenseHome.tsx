import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import styled from "styled-components";
import ExpenseStatus from "../../components/expenseStatus";
import ExpenseTable from "../../components/table/expenseTable";
import AddExpense from "../../components/adddExpense";

const Exhome = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Exheader = styled.div`
  width: 100vw;
  height: 100px;
  border: 1px solid black;

  @media (max-width: 480px) {
    height: 120px;
  }
`;

const Exh1 = styled.h1`
  float: left;
  margin-left: 20px;

  @media (max-width: 480px) {
    float: none;
    margin-left: 0;
    text-align: center;
    font-size: 25px;
  }
`;

const Signout = styled.div`
  float: right;
  margin-top: 30px;
  margin-right: 40px;
  border: none;
  border-radius: 5px;

  @media (max-width: 768px) {
    margin-right: 25px;
  }

  @media (max-width: 480px) {
    float: none;
    margin-top: -15px;
    margin-right: 0;
    margin-left: 20px;
    width: 330px;
  }
`;

const Exstatus = styled.div`
  width: 100vw;
  height: 125px;
  border: 1px solid black;
  padding-top: 20px;

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 350px;
    padding-top: 10px;
  }
`;

const Extable = styled.div`
  width: 100vw;
  height: 400px;
  border: 1px solid black;
`;

const Addex = styled.div`
    width: 100vw;
    height: 270px;
    border: 1px solid black; 

    @media (max-width: 768px){
      height : 345px;
    }

    @media (max-width:480px){
       height: 345px; 
    }
  `;

function ExpenseHome() {
  return (
    <>
      <CssBaseline />
      <Exhome>
        <Exheader>
          <div className="exTracker">
            <Exh1>Expense Tracker</Exh1>
          </div>
          <Signout>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                id="sobtn"
                style={{ backgroundColor: "#f36d6d" }}
                sx={{ width: "120px", minWidth: "100%" }}
              >
                Sign Out
              </Button>
            </Stack>
          </Signout>
        </Exheader>
        <Exstatus>
          <ExpenseStatus />
        </Exstatus>
        <>
          <CssBaseline />
          <Extable>
            <ExpenseTable />
          </Extable>

          <Addex>
            <AddExpense />
          </Addex>
        </>
      </Exhome>
    </>
  );
}

export default ExpenseHome;
