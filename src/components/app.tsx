import { h } from "preact";
import { Route, Router } from "preact-router";
import { RecoilRoot } from "recoil";
import { useErrorBoundary } from "use-error-boundary";

import Header from "./header";

import Home from "@src/routes/home";
import About from "@src/routes/about";

const App = () => {
  const { ErrorBoundary } = useErrorBoundary();
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <div id="app">
          <Header />
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about/" component={About} />
          </Router>
        </div>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;
