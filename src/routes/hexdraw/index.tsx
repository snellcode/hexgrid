import { h } from "preact";
import { useEffect } from "preact/hooks";
import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { PhaserRexScene } from "./scene";

let game: any;

const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: [PhaserRexScene],
  plugins: {
    scene: [
      {
        key: "rexBoard",
        plugin: BoardPlugin,
        mapping: "rexBoard",
      },
    ],
  },
};

type Props = {
  data: any;
  error: any;
  isPending: any;
};

const HexDraw = () => {
  useEffect(() => {
    if (game) {
      location.reload();
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

export default HexDraw;
