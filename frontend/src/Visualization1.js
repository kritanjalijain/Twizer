//import Basic from "./List.js";
import React from "react";
import NavBar from "./Navbar";

import { PieChart, PieArcSeries } from "reaviz";

import { DataGrid } from "@mui/x-data-grid";
import TweetEmbed from "react-tweet-embed";

import Grid from "@mui/material/Grid";
import TableRow from "./components/TableRow";

import "./visualization1.css";

const columns = [
  { field: "id", headerName: "ID", width: 130 },
  //{ field: "userName", headerName: "Username", width: 200 },
  { field: "text", headerName: "Tweet text", width: 300 },
  { field: "likeCount", headerName: "Like count", type: "number", width: 200 },
  {
    field: "quoteCount",
    headerName: "Quote count",
    type: "number",
    width: 200,
  },
  {
    field: "replyCount",
    headerName: "Reply count",
    type: "number",
    width: 200,
  },
  {
    field: "retweetCount",
    headerName: "Retweet count",
    type: "number",
    width: 200,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Visualization1 = ({ tweets }) => {
  //console.log(tweets);

  const maxParams = ({ result, mode }) => {
    // var declaration for maxParams
    let max_reply_count = 0,
      max_retweet_count = 0,
      max_quote_count = 0,
      max_like_count = 0;

    let id_max_reply_count,
      id_max_retweet_count,
      id_max_quote_count,
      id_max_like_count;

    // var declaration for sentimentCount
    let postive_count = 0,
      negative_count = 0,
      neutral_count = 0;

    // var declaration for pieData
    let data = [];

    // finding max param count
    for (let i = 0; i < result.length; i++) {
      if (mode === "maxParams") {
        // to find maxParams
        if (result[i].public_metrics.reply_count > max_reply_count) {
          max_reply_count = result[i].public_metrics.reply_count;
          id_max_reply_count = result[i].id;
        }
        if (result[i].public_metrics.retweet_count > max_retweet_count) {
          max_retweet_count = result[i].public_metrics.retweet_count;
          id_max_retweet_count = result[i].id;
        }
        if (result[i].public_metrics.quote_count > max_quote_count) {
          max_quote_count = result[i].public_metrics.quote_count;
          id_max_quote_count = result[i].id;
        }
        if (result[i].public_metrics.like_count > max_like_count) {
          max_like_count = result[i].public_metrics.like_count;
          id_max_like_count = result[i].id;
        }
      }
      // to find sentimentCount and pieData
      if (mode === "sentimentCount" || mode === "pieData") {
        if (result[i].sentiment === "Positive") {
          postive_count++;
        } else if (result[i].sentiment === "Negative") {
          negative_count++;
        } else {
          neutral_count++;
        }
      }
    }

    // returning max values
    if (mode === "maxParams") {
      return [
        { title: "Most Replied ↪", tweet_id: id_max_reply_count },
        { title: "Most Retweeted 🔁", tweet_id: id_max_retweet_count },
        { title: "Most Quoted 🖋", tweet_id: id_max_quote_count },
        { title: "Most Liked ❤", tweet_id: id_max_like_count },
      ];
    }

    // returning sentimentCount
    if (mode === "sentimentCount") {
      const percent_postive_count = (postive_count / result.length) * 100;
      const percent_negative_count = (negative_count / result.length) * 100;
      const percent_neutral_count = (neutral_count / result.length) * 100;

      return [
        {
          title: "Positive",
          count: postive_count,
          percent: percent_postive_count.toFixed(2),
        },
        {
          title: "Negative",
          count: negative_count,
          percent: percent_negative_count.toFixed(2),
        },
        {
          title: "Neutral",
          count: neutral_count,
          percent: percent_neutral_count.toFixed(2),
        },
      ];
    }

    // returning values for pieData
    if (mode === "pieData") {
      data.push({
        title: "Positive",
        count: postive_count,
      });
      data.push({
        title: "Negative",
        count: negative_count,
      });
      data.push({
        title: "Neutral",
        count: neutral_count,
      });
      return data;
    }
  };

  const sentimentCount = (result) => {
    let postive_count = 0,
      negative_count = 0,
      neutral_count = 0;

    //console.log("length ", result.length);
    for (let i = 0; i < result.length; i++) {
      if (result[i].sentiment === "Positive") {
        postive_count++;
      } else if (result[i].sentiment === "Negative") {
        negative_count++;
      } else {
        neutral_count++;
      }
    }

    // console.log(
    //   "postive",
    //   postive_count,
    //   "negative",
    //   negative_count,
    //   "neutral",
    //   neutral_count
    // );

    // const percent_postive_count = Math.floor(
    //   (postive_count / result.length) * 100
    // );
    // const percent_negative_count = Math.floor(
    //   (negative_count / result.length) * 100
    // );
    // const percent_neutral_count = Math.floor(
    //   (neutral_count / result.length) * 100
    // );

    const percent_postive_count = (postive_count / result.length) * 100;
    const percent_negative_count = (negative_count / result.length) * 100;
    const percent_neutral_count = (neutral_count / result.length) * 100;

    return [
      {
        title: "Positive",
        count: postive_count,
        percent: percent_postive_count.toFixed(2),
      },
      {
        title: "Negative",
        count: negative_count,
        percent: percent_negative_count.toFixed(2),
      },
      {
        title: "Neutral",
        count: neutral_count,
        percent: percent_neutral_count.toFixed(2),
      },
    ];
  };

  const rows = (tweets) => {
    let rows = [];
    for (let i = 0; i < tweets.result.length; i++) {
      rows.push({
        id: i,
        //userName: tweets.username.users[i].username,
        text: tweets.result[i].text,
        likeCount: tweets.result[i].public_metrics.like_count,
        quoteCount: tweets.result[i].public_metrics.quote_count,
        replyCount: tweets.result[i].public_metrics.reply_count,
        retweetCount: tweets.result[i].public_metrics.retweet_count,
      });
    }
    return rows;
  };

  const pieData = (result) => {
    let data = [];
    let postive_count = 0,
      negative_count = 0,
      neutral_count = 0;

    for (let i = 0; i < result.length; i++) {
      if (result[i].sentiment === "Positive") {
        postive_count++;
      } else if (result[i].sentiment === "Negative") {
        negative_count++;
      } else {
        neutral_count++;
      }
    }

    data.push({
      key: "Postive",
      data: postive_count,
    });
    data.push({
      key: "Negative",
      data: negative_count,
    });
    data.push({
      key: "Neutral",
      data: neutral_count,
    });

    return data;
  };

  const langTwitter = (result) => {
    // let en=0,ar=0,bn=0,es=0,fr=0,de=0,it=0,pt=0,ru=0,tr=0,und=0;
    let en = 0,
      ar = 0,
      bn = 0,
      cs = 0,
      da = 0,
      de = 0,
      el = 0,
      es = 0,
      fa = 0,
      fi = 0,
      fil = 0,
      fr = 0,
      he = 0,
      hi = 0,
      hu = 0,
      id = 0,
      it = 0,
      ja = 0,
      ko = 0,
      msa = 0,
      nl = 0,
      no = 0,
      pl = 0,
      pt = 0,
      ro = 0,
      ru = 0,
      sv = 0,
      th = 0,
      tr = 0,
      uk = 0,
      ur = 0,
      vi = 0,
      und = 0;

    for (let i = 0; i < result.length; i++) {
      switch (result[i].lang) {
        case "en":
          en++;
          break;
        case "ar":
          ar++;
          break;
        case "bn":
          bn++;
          break;
        case "cs":
          cs++;
          break;
        case "da":
          da++;
          break;
        case "de":
          de++;
          break;
        case "el":
          el++;
          break;
        case "es":
          es++;
          break;
        case "fa":
          fa++;
          break;
        case "fi":
          fi++;
          break;
        case "fil":
          fil++;
          break;
        case "fr":
          fr++;
          break;
        case "he":
          he++;
          break;
        case "hi":
          hi++;
          break;
        case "hu":
          hu++;
          break;
        case "id":
          id++;
          break;
        case "it":
          it++;
          break;
        case "ja":
          ja++;
          break;
        case "ko":
          ko++;
          break;
        case "msa":
          msa++;
          break;
        case "nl":
          nl++;
          break;
        case "no":
          no++;
          break;
        case "pl":
          pl++;
          break;
        case "pt":
          pt++;
          break;
        case "ro":
          ro++;
          break;
        case "ru":
          ru++;
          break;
        case "sv":
          sv++;
          break;
        case "th":
          th++;
          break;
        case "tr":
          tr++;
          break;
        case "uk":
          uk++;
          break;
        case "ur":
          ur++;
          break;
        case "vi":
          vi++;
          break;
        case "und":
          und++;
          break;
      }
    }

    return [
      {
        key: "English",
        data: en,
      },
      {
        key: "Arabic",
        data: ar,
      },
      {
        key: "Bengali",
        data: bn,
      },
      {
        key: "Czech",
        data: cs,
      },
      {
        key: "Danish",
        data: da,
      },
      {
        key: "German",
        data: de,
      },
      {
        key: "Greek",
        data: el,
      },
      {
        key: "Spanish",
        data: es,
      },
      {
        key: "Farsi",
        data: fa,
      },
      {
        key: "Finnish",
        data: fi,
      },
      {
        key: "Filipino",
        data: fil,
      },
      {
        key: "French",
        data: fr,
      },
      {
        key: "Hebrew",
        data: he,
      },
      {
        key: "Hindi",
        data: hi,
      },
      {
        key: "Hungarian",
        data: hu,
      },
      {
        key: "Indonesian",
        data: id,
      },
      {
        key: "Italian",
        data: it,
      },
      {
        key: "Japanese",
        data: ja,
      },
      {
        key: "Korean",
        data: ko,
      },
      {
        key: "Malay",
        data: msa,
      },
      {
        key: "Dutch",
        data: nl,
      },
      {
        key: "Norwegian",
        data: no,
      },
      {
        key: "Polish",
        data: pl,
      },
      {
        key: "Portuguese",
        data: pt,
      },
      {
        key: "Romanian",
        data: ro,
      },
      {
        key: "Russian",
        data: ru,
      },
      {
        key: "Swedish",
        data: sv,
      },
      {
        key: "Thai",
        data: th,
      },
      {
        key: "Turkish",
        data: tr,
      },
      {
        key: "Ukrainian",
        data: uk,
      },
      {
        key: "Urdu",
        data: ur,
      },
      {
        key: "Vietnamese",
        data: vi,
      },
      {
        key: "Undefined",
        data: und,
      },
    ];
  };

  return (
    <>
      <NavBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Dashboard</h1>
        {/* <Grid container justifyContent="space-evenly">
          <Grid item className="user-profile">
            Username:&nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${tweets.profile.user}`}
            >
              {tweets.profile.user}
            </a>
          </Grid>
          <Grid item>Followers: {tweets.profile.Followers}</Grid>
          <Grid item>Friends: {tweets.profile.Friends}</Grid>
          <Grid item>Total Tweets: {tweets.profile.Tweets}</Grid>
          <Grid item>Total Tweets Liked: {tweets.profile["Tweets liked"]}</Grid>
        </Grid> */}
        <Grid container direction="row">
          <Grid container xs={6}>
            <Grid
              container
              direction="column"
              // spacing={6}
              justifyContent="space-evenly"
              alignItems="center"
            >
              {tweets.result ? (
                maxParams({
                  result: tweets.result,
                  mode: "sentimentCount",
                }).map((items, index) => {
                  return (
                    <Grid item id={index}>
                      <TableRow
                        title={items.title}
                        count={items.count}
                        percent={items.percent}
                      />
                    </Grid>
                  );
                })
              ) : (
                <h2>Loading</h2>
              )}
            </Grid>
          </Grid>

          <Grid container direction="column" xs={6} justifyContent="center">
            {tweets.result ? (
              <PieChart
                height={300}
                width={350}
                data={pieData(tweets.result)}
              />
            ) : (
              <h2>Loading</h2>
            )}
            <p>Distribution of tweets over Sentiment</p>
          </Grid>
        </Grid>
        <br />

        <Grid container justifyContent="center">
          <PieChart
            width={400}
            height={300}
            data={langTwitter(tweets.result)}
            series={<PieArcSeries explode={true} />}
          />
        </Grid>
        <Grid container justifyContent="center">
          <p>Distribution of tweets over Languages </p>
        </Grid>

        <br />

        <Grid container justifyContent="space-evenly">
          {" "}
          {tweets.result ? (
            maxParams({ result: tweets.result, mode: "maxParams" }).map(
              (item, index) => {
                return (
                  <Grid item>
                    <TweetEmbed
                      id={item.tweet_id}
                      placeholder={<h2>Loading</h2>}
                      margin={0}
                    />
                    <p style={{ textAlign: "center" }}>{item.title}</p>
                  </Grid>
                );
              }
            )
          ) : (
            <h2>Loading</h2>
          )}
        </Grid>
        <br />
        <Grid style={{ height: 400, width: "100%" }}>
          {tweets.result ? (
            <DataGrid
              rows={rows(tweets)}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          ) : (
            <h2>Loading</h2>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Visualization1;
