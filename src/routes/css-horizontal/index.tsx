import { h } from "preact";
import "./style.scss";

const CssHorizontal = () => (
  <div class="app-route container">
    <div class="css-horizontal">
      <div class="css-horizontal-container">
        {[...Array(200)].map((e, i) => (
          <div></div>
        ))}
      </div>
    </div>
  </div>
);

export default CssHorizontal;
