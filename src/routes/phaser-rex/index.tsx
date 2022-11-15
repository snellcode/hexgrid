import { h } from "preact";
import { useEffect } from "preact/hooks";
import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { PhaserRexScene } from  "./scene";

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

const PhaserRex = () => {
  useEffect(() => {
    if (game) {
      location.reload();
    }
    game = new Phaser.Game(config);
  });
  return (
    <div class="app-route container">
      <div id="phaser-container"></div>
    </div>
  );
};

export default PhaserRex;
