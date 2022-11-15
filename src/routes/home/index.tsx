import { h } from "preact";

const Home = () => {
  return (
    <div class="app-route container">
      <h1>CSS Hexagons</h1>
      <ul>
        <li><a href="/css-vertical">CSS Vertical Hexagons</a></li>
        <li><a href="/css-horizontal">CSS Horizontal Hexagons</a></li>
        <li><a href="/phaser-rex">Phaser Rex Plugin</a></li>
      </ul>
    </div>
  );
};

export default Home;