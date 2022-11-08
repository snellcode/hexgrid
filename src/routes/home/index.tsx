import { h } from "preact";
import style from "./style.css";
import { useEffect } from "preact/hooks";

import Phaser from "phaser";

import { DemoScene } from "/scenes/DemoScene";

import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin.js";

// const config: Phaser.Types.Core.GameConfig = {
//   type: Phaser.AUTO,
//   parent: "phaser-container",
//   backgroundColor: "#282c34",
//   scale: {
//     mode: Phaser.Scale.ScaleModes.RESIZE,
//     width: window.innerWidth,
//     height: window.innerHeight,
//   },
//   physics: {
//     default: "arcade",
//     arcade: {
//       gravity: { y: 200 },
//     },
//   },

//   plugins: {
//     scene: [
//       {
//         key: "rexBoard",
//         plugin: BoardPlugin,
//         mapping: "rexBoard",
//       },
//     ],
//   },

//   scene: [HelloWorldScene],
// };

const Home = () => {
  useEffect(() => {



var config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: DemoScene,
    plugins: {
          scene: [{
              key: 'rexBoard',
              plugin: BoardPlugin,
              mapping: 'rexBoard'
          }]
    }
};

var game = new Phaser.Game(config);



  });

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <div id="phaser-container"></div>
    </div>
  );
};

export default Home;
