import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ResetPasswordOnSubmit } from "./types";

import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { fogot } from "../../slice/userSlice";

import styled from "styled-components";

const RPassword = styled.div`
  @media (min-width: 1200px) {
    background-color: #c2d6d6;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
  }

  @media (max-width: 480px) {
    background-color: none;
  }
`;
const Rpbody = styled.div`
  width: 500px;
  height: 350px;
  background-color: white;
  opacity: 0.8;
  align-items: center;
  margin: auto;
  padding-top: 25px;

  @media (max-width: 768px) {
    margin-top: 100px;
  }

  @media (max-width: 480px) {
    margin-top: 200px;
  }
`;

const Rph1 = styled.h1`
  margin-left: 30px;
  margin-top: 20px;
`;

const RpErrMsg = styled.span`
  color: red;
`;

function ResetPassword() {
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email").required("Required"),
    });
    const onSubmit = (e: ResetPasswordOnSubmit) => {
        const email = e.email;

        dispatch(fogot({ auth, email, navigate }))
    };

    const navigateLogin = () => {
        navigate("/");
    };
    return (
        <RPassword>
            <Rpbody>
                <Rph1>Reset Password</Rph1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 4, width: "50ch" },
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
                                        render={(rpmsg) => <RpErrMsg>{rpmsg}</RpErrMsg>}
                                    />
                                }
                            />
                        </Box>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                id="rpbtn"
                                type="submit"
                                style={{ width: "430px", marginLeft: "32px" }}
                            >
                                Send Password Reset Link
                            </Button>
                        </Stack>
                    </Form>
                </Formik>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="text"
                        id="bbtn"
                        onClick={navigateLogin}
                        style={{ marginTop: "20px", marginLeft: "25px" }}
                    >
                        Back
                    </Button>
                </Stack>
            </Rpbody>
        </RPassword>
    );
}

export default ResetPassword;
