import "../../utils/register.css";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

function Register() {
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email").required("Required"),
        password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Required"),
    });
    const onSubmit = (values: any) => {
        console.log(values);
    };

    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate("/");
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <div className="Register">
                <div className="rbody">
                    <h1 id="rh1">Register</h1>
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
                                <Field as={TextField}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="email"
                                            render={(rmsg) => <span className="rej-err-msg">{rmsg}</span>}
                                        />
                                    }
                                />

                                <Field as={TextField}
                                    id="password"
                                    label="Password"
                                    name="password"
                                    variant="outlined"
                                    type="password"
                                    helperText={
                                        <ErrorMessage
                                            name="password"
                                            render={(rmsg) => <span className="rej-err-msg">{rmsg}</span>}
                                        />
                                    }
                                />
                            </Box>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" id="rbtn" type="submit">
                                    Register
                                </Button>
                            </Stack>
                        </Form>
                    </Formik>
                    <Stack spacing={2} direction="row">
                        <Button variant="text" id="bbtn" onClick={navigateLogin}>
                            Back
                        </Button>
                    </Stack>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;
