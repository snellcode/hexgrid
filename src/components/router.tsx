import { h } from "preact";
import { Route, Router } from "preact-router";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";

import { AppError } from "./error";
import Home from "@src/routes/home";
import About from "@src/routes/about";
import CssVertical from "@src/routes/css-vertical";
import CssVertical2 from "@src/routes/css-vertical-2";
import CssHorizontal from "@src/routes/css-horizontal";
import PhaserRex from "@src/routes/phaser-rex";
import PhaserCustom from "@src/routes/phaser-custom";

export const AppRouter = () => {
  return (
    <RecoilRoot>
      <div class="app-router">
        <ErrorBoundary FallbackComponent={AppError}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/css-vertical/" component={CssVertical} />
            <Route path="/css-vertical-2/" component={CssVertical2} />
            <Route path="/css-horizontal/" component={CssHorizontal} />
            <Route path="/phaser-rex/" component={PhaserRex} />
            <Route path="/phaser-custom/" component={PhaserCustom} />
          </Router>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
};
