import "../../utils/login.css";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
//import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function LogIn() {
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email").required("Required"),
        password: yup.string().required("Required"),
    });
    const onSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <React.Fragment>
            <CssBaseline />

            <div className="Login">
                <div className="lbody">
                    <h1 id="lh1">Login</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": {
                                        m: 2,
                                        marginLeft: "30px",
                                        width: "50ch",
                                    },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Field
                                    as={TextField}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="email"
                                            render={(msg) => <span className="err-msg">{msg}</span>}
                                        />
                                    }
                                />

                                <Field
                                    as={TextField}
                                    id="password"
                                    label="Password"
                                    name="password"
                                    variant="outlined"
                                    type="password"
                                    helperText={
                                        <ErrorMessage
                                            name="password"
                                            render={(msg) => <span className="err-msg">{msg}</span>}
                                        />
                                    }
                                />
                            </Box>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" id="lbtn" type="submit">
                                    Sign In
                                </Button>
                            </Stack>
                        </Form>
                    </Formik>

                    <Stack spacing={2} direction="row">
                        <Button variant="text" id="cabtn">
                            Create Account
                        </Button>
                        <Button variant="text" id="fpbtn">
                            Forgot Password
                        </Button>
                    </Stack>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LogIn;
