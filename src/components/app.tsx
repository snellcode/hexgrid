import { h } from "preact";
import { RecoilRoot } from "recoil";

import { AppHeader } from "./header";
import { AppRouter } from "./router";

const App = () => {
  return (
    <RecoilRoot>
      <div id="app">
        <AppHeader />
        <AppRouter />
      </div>
    </RecoilRoot>
  );
};

export default App;
