import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";

import styled from "styled-components";

import { useState } from "react";

const Cexincome = styled.div`
  width: 375px;
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
const Cexremaining = styled.div`
  width: 375px;
  height: 100px;
  /* border: 1px solid black; */
  float: left;
  margin-left: 90px;
  background-color: rgb(176, 252, 227);
  border-radius: 10px;

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
const Cexspent = styled.div`
  width: 375px;
  height: 100px;
  /* border: 1px solid black; */
  float: left;
  margin-left: 90px;
  background-color: rgb(2, 173, 173);
  border-radius: 10px;

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

    const buttonClick = () => {
        setIsClick((current) => !current);
    };
    return (
        <>
            <CssBaseline />
            <div className="cexStatus">
                <Cexincome>
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
                                Income :Rs 0000.00
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
                </Cexincome>
                <Cexremaining>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 500,
                            marginLeft: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Remaining :Rs 0000.00
                        </Typography>
                    </Box>
                </Cexremaining>
                <Cexspent>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 500,
                            marginLeft: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Spent :Rs 0000.00
                        </Typography>
                    </Box>
                </Cexspent>
            </div>
        </>
    );
}

export default ExpenseStatus;
