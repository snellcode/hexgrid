import { h } from "preact";
import { useEffect } from "preact/hooks";
import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import AwaitLoaderPlugin from "phaser3-rex-plugins/plugins/awaitloader-plugin";
import { Scene } from "./scene";

let game: any;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  scene: [Scene],
  plugins: {
    global: [
      {
        key: "rexAwaitLoader",
        plugin: AwaitLoaderPlugin,
        start: true,
      },
    ],
    scene: [
      {
        key: "rexBoard",
        plugin: BoardPlugin,
        mapping: "rexBoard",
      },
    ],
  },
};

const IslandCentered = () => {
  useEffect(() => {
    if (game) {
      game.destroy();
      game = null;
    }
    game = new Phaser.Game(config);
  });
  return (
    <div class="app-route container">
      <p>If the game does not start, please refresh the page</p>
      <div id="phaser-container"></div>
    </div>
  );
};

export default IslandCentered;
