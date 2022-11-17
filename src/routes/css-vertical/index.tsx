import { h } from "preact";
import "./style.scss";

const CssVertical = () => (
  <div class="app-route container">
    <div class="css-vertical">
      <div class="css-vertical-container">
        {[...Array(200)].map((e, i) => (
          <div></div>
        ))}
      </div>
    </div>
  </div>
);

export default CssVertical;
