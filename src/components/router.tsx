import { h } from "preact";
import { Route, Router } from "preact-router";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";

import { AppError } from "./error";
import Home from "@src/routes/home";
import About from "@src/routes/about";
import CssVertical from "@src/routes/css-vertical";
import CssHorizontal from "@src/routes/css-horizontal";
import PhaserRex from "@src/routes/phaser-rex";
import PhaserRex2 from "@src/routes/phaser-rex2";

export const AppRouter = () => {
  return (
    <RecoilRoot>
      <div class="app-router">
        <ErrorBoundary FallbackComponent={AppError}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/css-vertical/" component={CssVertical} />
            <Route path="/css-horizontal/" component={CssHorizontal} />
            <Route path="/phaser-rex/" component={PhaserRex} />
            <Route path="/phaser-rex2/" component={PhaserRex2} />
          </Router>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
};
