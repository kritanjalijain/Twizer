import React, { useState } from "react";
import ReactDOM from "react-dom";
import LandingPage from "./Landing";
import Visualization from "./Visualization";
import Visualization1 from "./Visualization1";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import MapChart from "./MapChart";

function App() {
  const [tweets, setTweets] = useState();
  console.log("tweets", tweets);
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route exact path="/">
          <LandingPage setTweets={setTweets} />
        </Route>
        <Route exact path="/visualization">
          <Visualization tweets={tweets} />
        </Route>
        <Route exact path="/visualization1">
          <Visualization1 tweets={tweets} />
        </Route>
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
