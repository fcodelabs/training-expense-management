import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { LoginOnSubmit } from "./types";

<<<<<<< HEAD
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../slice/userSlice";

=======
>>>>>>> 19f5a1a94fcf8868fd233e80d2e71d06b233687d
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

<<<<<<< HEAD
const LoginContainer = styled.div`
=======
const Login = styled.div`
>>>>>>> 19f5a1a94fcf8868fd233e80d2e71d06b233687d
  @media (min-width: 1200px) {
    background-color: #c2d6d6;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
  }

  @media (max-width: 480px) {
    background-color: none;
  }
`;

<<<<<<< HEAD
const LoginBody = styled.div`
=======
const Lbody = styled.div`
>>>>>>> 19f5a1a94fcf8868fd233e80d2e71d06b233687d
  width: 500px;
  height: 500px;
  background-color: white;
  opacity: 0.8;
  align-items: center;
  margin: auto;
  padding-top: 25px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    margin-top: 150px;
  }
`;

<<<<<<< HEAD
const LoginH1Tag = styled.h1`
=======
const Lh1 = styled.h1`
>>>>>>> 19f5a1a94fcf8868fd233e80d2e71d06b233687d
  margin-left: 30px;
  margin-top: 20px;
`;

<<<<<<< HEAD
const LogErrMsg = styled.span`
=======
const ErrMsg = styled.span`
>>>>>>> 19f5a1a94fcf8868fd233e80d2e71d06b233687d
  color: red;
`;

function LogIn() {
    const auth = getAuth();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email").required("Required"),
        password: yup.string().required("Required"),
    });
    const onSubmit = (e: LoginOnSubmit) => {
        const email = e.email;
        const password = e.password;

        dispatch(login({ auth, email, password, navigate }))
    };

    const navigate = useNavigate();

    const navigateRegister = () => {
        navigate("/register");
    };
    const navigateResetPassword = () => {
        navigate("/resetPassword");
    };

    return (
<<<<<<< HEAD
        <LoginContainer>
            <LoginBody>
                <LoginH1Tag>Login</LoginH1Tag>
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
                                        render={(msg) => <LogErrMsg>{msg}</LogErrMsg>}
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
                                        render={(msg) => <LogErrMsg>{msg}</LogErrMsg>}
                                    />
                                }
                            />
                        </Box>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                id="lbtn"
                                type="submit"
                                style={{ width: "445px", marginLeft: "30px" }}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </Form>
                </Formik>

                <Stack spacing={2} direction="row">
                    <Button
                        variant="text"
                        id="cabtn"
                        style={{ marginTop: "20px", marginLeft: "25px" }}
                        onClick={navigateRegister}
                    >
                        Create Account
                    </Button>
                    <Button
                        variant="text"
                        id="fpbtn"
                        style={{ marginTop: "20px", float: "right", marginLeft: "140px" }}
                        onClick={navigateResetPassword}
                    >
                        Forgot Password
                    </Button>
                </Stack>
            </LoginBody>
        </LoginContainer>
=======
        <>
            <CssBaseline />
            <Login>
                <Lbody>
                    <Lh1>Login</Lh1>
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
                                            render={(msg) => <ErrMsg>{msg}</ErrMsg>}
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
                                            render={(msg) => <ErrMsg>{msg}</ErrMsg>}
                                        />
                                    }
                                />
                            </Box>
                            <Stack spacing={2} direction="row">
                                <Button
                                    variant="contained"
                                    id="lbtn"
                                    type="submit"
                                    style={{ width: "445px", marginLeft: "30px" }}
                                >
                                    Sign In
                                </Button>
                            </Stack>
                        </Form>
                    </Formik>

                    <Stack spacing={2} direction="row">
                        <Button variant="text" id="cabtn" onClick={navigateRegister}>
                            Create Account
                        </Button>
                        <Button
                            variant="text"
                            id="fpbtn"
                            style={{ marginTop: "20px", float: "right", marginLeft: "140px" }}
                        >
                            Forgot Password
                        </Button>
                    </Stack>
                </Lbody>
            </Login>
        </>
>>>>>>> 19f5a1a94fcf8868fd233e80d2e71d06b233687d
    );
}

export default LogIn;
