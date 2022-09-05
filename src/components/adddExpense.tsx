import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
//import { TypedRegEx } from 'typed-regex';

import styled from "styled-components";

const Adex = styled.div`
  margin-left: 20px;
`;
const Adp = styled.div`
  font-size: 25px;

  @media (max-width: 480px) {
    text-align: center;
  }
`;
const Adbody = styled.div`
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
const AdName = styled.div`
  float: left;

  @media (max-width: 768px) {
    width: 96.3%;
  }

  @media (max-width: 480px) {
    width: 330px;
  }
`;
const AdCost = styled.div`
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
const Adsave = styled.div`
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
    const initialValues = {
        exname: "",
        excost: "",
    };
    const validationSchema = yup.object().shape({
        exname: yup.string().required("Pleace Enter Valid Expense"),
        excost: yup.number().typeError("Please Enter with Numbers").required("Enter Expense Cost"),
    });
    const onSubmit = (exValues: any) => {
        console.log(exValues);
    };
    return (
        <>
            <CssBaseline />
            <div className="addExpense">
                <Adex>
                    <Adp>
                        <p>Add Expense</p>
                    </Adp>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Adbody>
                                <AdName>
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
                                </AdName>
                                <AdCost>
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
                                </AdCost>
                            </Adbody>
                            <Adsave>
                                <Stack spacing={2} direction="row">
                                    <Button
                                        variant="contained"
                                        sx={{ width: "100px", minWidth: "100%" }}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Adsave>
                        </Form>
                    </Formik>
                </Adex>
            </div>
        </>
    );
}

export default AddExpense;
