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
import HexDraw from "@src/routes/hexdraw";
import Flower from "@src/routes/flower";
import Island from "@src/routes/island";

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
            <Route path="/hexdraw/" component={HexDraw} />
            <Route path="/flower/" component={Flower} />
            <Route path="/island/" component={Island} />
          </Router>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
};
