import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AddExpenseOnSubmit } from "./types/addExTypes";

import {
    addEx,
    selectTotalExpense,
    selectTotalIncome,
} from "../slice/expenseSlice";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const AddEx = styled.div`
  padding-left: 20px;
`;
const AddPtag = styled.div`
  font-size: 25px;

  @media (max-width: 480px) {
    text-align: center;
  }
`;
const AddBody = styled.div`
  width: 600px;
  height: 110px;
  //border: 1px solid black;

  @media (max-width: 768px) {
    height: 215px;
    margin-top: -20px;
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 330px;
    height: 215px;
    margin-top: -20px;
  }
`;
const AddName = styled.div`
  float: left;

  @media (max-width: 768px) {
    width: 96.3%;
  }

  @media (max-width: 480px) {
    width: 330px;
  }
`;
const AddCost = styled.div`
  float: left;
  margin-left: 30px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 96.3%;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    width: 330px;
  }
`;
const AddSave = styled.div`
  float: left;
  margin-top: 10px;

  @media (max-width: 480px) {
    width: 330px;
  }
`;

const Exmsg = styled.span`
  color: red;
`;
function AddExpense() {
    const dispatch = useDispatch();

    const expense = useSelector(selectTotalExpense);
    const income = useSelector(selectTotalIncome);

    const totIncome = income.totalIncome;
    const totExpense = expense.totalExpense;

    const initialValues = {
        exname: "",
        excost: "",
    };
    const validationSchema = yup.object().shape({
        exname: yup.string().required("Pleace Enter Valid Expense"),
        excost: yup
            .number()
            .typeError("Please Enter with Numbers")
            .required("Enter Expense Cost"),
    });
    const onSubmit = (e: AddExpenseOnSubmit) => {
        console.log(e);
        const exname = e.exname;
        const excost = e.excost;

        if (totIncome === 0) {
            alert("Cannot Add Expenses");
        } else if (totIncome <= totExpense) {
            alert("Cannot Add Expenses");
        } else {
            dispatch(addEx({ exname, excost }));
        }
        e.exname = "";
        e.excost = "";
    };

    return (
        <>
            <CssBaseline />
            <div className="addExpense">
                <AddEx>
                    <AddPtag>
                        <p>Add Expense</p>
                    </AddPtag>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <AddBody>
                                <AddName>
                                    <p>Name</p>
                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": {
                                                width: "30ch",
                                                marginTop: "-15px",
                                                minWidth: "100%",
                                            },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Field
                                            as={TextField}
                                            id="exname"
                                            variant="outlined"
                                            size="small"
                                            name="exname"
                                            helperText={
                                                <ErrorMessage
                                                    name="exname"
                                                    render={(exmsg) => <Exmsg>{exmsg}</Exmsg>}
                                                />
                                            }
                                        />
                                    </Box>
                                </AddName>
                                <AddCost>
                                    <p>Cost</p>
                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": {
                                                width: "30ch",
                                                marginTop: "-15px",
                                                minWidth: "100%",
                                            },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Field
                                            as={TextField}
                                            id="excost"
                                            variant="outlined"
                                            size="small"
                                            name="excost"
                                            helperText={
                                                <ErrorMessage
                                                    name="excost"
                                                    render={(exmsg) => <Exmsg>{exmsg}</Exmsg>}
                                                />
                                            }
                                        />
                                    </Box>
                                </AddCost>
                            </AddBody>
                            <AddSave>
                                <Stack spacing={2} direction="row">
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{ width: "100px", minWidth: "100%" }}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </AddSave>
                        </Form>
                    </Formik>
                </AddEx>
            </div>
        </>
    );
}

export default AddExpense;
