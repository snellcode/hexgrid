import { h } from "preact";

const About = () => {
  return (
    <div class="app-route container">
      <p>By Phil Snell, with help from:</p>
      <ul>
        <li>
          CSS Hexagons 1:
          <a href="https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/">
            Source
          </a>
        </li>
        <li>
          CSS Hexagons 2:
          <a href="https://codepen.io/Kseso/pen/xqNdmO">
            Source
          </a>
        </li>
        <li>
          Phaser Rex Plugin: 
          <a href="https://rexrainbow.github.io/phaser3-rex-notes/docs/site/board-hexagonmap/">
            Source
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;
