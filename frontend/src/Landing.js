import React, { useState } from "react";
import NavBar from "./Navbar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { Redirect, Link, useHistory } from "react-router-dom";

import "./landing.css";

function LandingPage({ setTweets }) {
  const history = useHistory();
  const [error, setError] = useState({ status: false, msg: "" });
  const [data, setData] = useState({
    user: "",
    num: 70,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("hey change");
    // console.log(e.target);
    // console.log(e.target.value);
    // console.log(data);

    //value = value.substring(1);

    //console.log("value being sent->", value);

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Submitted data",
      data,
      "To lowercase",
      data.user.toLowerCase()
    );

    // const endpoint = ;
    const headers = {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    };

    // check for hashtag
    if (/(?!\s)#[A-Za-z]\w*\b/g.test(data.user)) {
      console.log("Hashtag found !!!");
      const sendData = { user: data.user.substring(1), num: `${data.num}` };
      console.log("sendData", sendData);
      axios
        .post("http://localhost:5000/api/hashtag", sendData, headers)
        .then((res) => {
          if (res.status === 200) {
            console.log("success");

            // let newdata = res.json();

            // console.log("newdata->", newdata);

            setTweets(res.data);
            history.push("/visualization1");
          }
        })
        .catch((err) => {
          console.log("error",err);
          setError({ status: false, msg: "" });
        });
    }

    // check for username
    else if (
      /(?![\s,.?\/()"\'()*+,-./:;<=>?@[\\]^_`{|}~])@[A-Za-z]\w*?\b/g.test(
        data.user
      )
    ) {
      console.log("Username found !!!");
      const sendData = { user: data.user.substring(1), num: `${data.num}` };
      console.log("sendData", sendData);

      axios
        .post("http://localhost:5000/api/sentiment", sendData, headers)
        .then((res) => {
          if (res.status === 200) {
            console.log("success");

            // let newdata = res.json();

            // console.log("newdata->", newdata);

            setTweets(res.data);
            history.push("/visualization");
          }
        })
        .catch((err) => {
          console.log("error", err);
          setError({ status: false, msg: "" });
        });
    } else {
      setError({
        status: true,
        msg: "Invalid! Use @ or # before",
      });
    }

    // axios
    //   .post(endpoint, data, headers)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log("success");

    //       let newdata = res.json();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("error");
    //   });
  };

  return (
    <Grid container direction="column">
      <NavBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <br />
        <h1>tWizer, The Smart Twitter Analyzer.👋</h1>

        <p className="info-text">
          Hey there! Welcome to tWizer. A tool for powerful and insightful
          visualizations and analytics for understanding Twitter data's impact
          at a glance to facilitate brand monitoring, main users around
          conversations and for measuring campaign hashtag performance. This app
          scrapes (and never keeps or stores!) the tweets you want to analyze.
        </p>
        <br />
        <p className="info-text">
          To begin, let's select the type of search you want to conduct. You can
          either search a twitter handle (e.g. @elonmusk) which will analyse the
          recent tweets of that user or search a trending hashtag (e.g.
          #WorkFromHome) to classify sentiments of the tweets regarding it.
        </p>
        <h3>Enter the username or hashtag to search</h3>
        <form className="forms" id="contact-form">
          <Box
            // component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={error.status}
              required
              name="user"
              label="Enter @username or #hashtag"
              variant="outlined"
              value={data.user}
              helperText={error.msg}
              onChange={handleChange}
            />
            <Typography>Number to tweets to analyse 🔍</Typography>
            <Slider
              value={data.num}
              name="num"
              min={10}
              max={100}
              defaultValue={70}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-label="Default"
            />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
              >
                submit
              </Button>
            </Stack>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
