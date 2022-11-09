import { h } from "preact";
import { Route, Router } from "preact-router";

import { RecoilRoot } from "recoil";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import About from "../routes/about";

const App = () => (
  <RecoilRoot>
    <div id="app">
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about/" component={About} />
      </Router>
    </div>
  </RecoilRoot>
);

export default App;
