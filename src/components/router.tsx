import { h } from "preact";
import { Route, Router } from "preact-router";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";

import { AppError } from "./error";
import Home from "@src/routes/home";
import About from "@src/routes/about";

export const AppRouter = () => {
  return (
    <RecoilRoot>
      <div class="app-router">
        <ErrorBoundary FallbackComponent={AppError}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about/" component={About} />
          </Router>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
};
