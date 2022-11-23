import { h } from "preact";
import { Route, Router } from "preact-router";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "./error";
import Home from "@src/routes/home";
import About from "@src/routes/about";
import CssVertical from "@src/routes/css-vertical";
import CssHorizontal from "@src/routes/css-horizontal";
import HexDraw from "@src/routes/hexdraw";
import Flower from "@src/routes/flower";
import Island from "@src/routes/island";
import IslandCentered from "@src/routes/island-centered";
import IslandFit from "@src/routes/island-fit";
import PhaserRex from "@src/routes/phaser-rex";

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
            <Route path="/hexdraw/" component={HexDraw} />
            <Route path="/flower/" component={Flower} />
            <Route path="/island/" component={Island} />
            <Route path="/island-centered/" component={IslandCentered} />
            <Route path="/island-fit/" component={IslandFit} />
            <Route path="/phaser-rex/" component={PhaserRex} />
          </Router>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
};
