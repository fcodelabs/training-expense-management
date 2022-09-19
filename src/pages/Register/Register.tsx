import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { register } from "../../slice/userSlice";

import { RegisterOnSubmit } from "./types";

import styled from "styled-components";

const RegisterContainer = styled.div`
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

const RegisterBody = styled.div`
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

const RegH1Tag = styled.h1`
  margin-left: 30px;
  margin-top: 20px;
`;

const RegErrMsg = styled.span`
  color: red;
`;


function Register() {

    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email").required("Required"),
        password: yup
            .string()
            .min(8, "Password should be of minimum 8 characters length")
            .required("Required"),
    });
    const onSubmit = (e: RegisterOnSubmit) => {
        const email = e.email;
        const password = e.password;

        dispatch(register({ auth, email, password, navigate }));
    };

    const navigateLogin = () => {
        navigate("/");
    };
    return (
        <RegisterContainer>
            <RegisterBody>
                <RegH1Tag>Register</RegH1Tag>
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
                                        render={(rmsg) => <RegErrMsg>{rmsg}</RegErrMsg>}
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
                                        render={(rmsg) => <RegErrMsg>{rmsg}</RegErrMsg>}
                                    />
                                }
                            />
                        </Box>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                id="rbtn"
                                type="submit"
                                style={{ marginLeft: "30px", width: "445px" }}
                            >
                                Register
                            </Button>
                        </Stack>
                    </Form>
                </Formik>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="text"
                        id="bbtn"
                        style={{ marginTop: "20px", marginLeft: "25px" }}
                        onClick={navigateLogin}
                    >
                        Back
                    </Button>
                </Stack>
            </RegisterBody>
        </RegisterContainer>
    );
}

export default Register;
