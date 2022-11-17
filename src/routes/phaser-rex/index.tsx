import { h } from "preact";
import { useEffect } from "preact/hooks";
import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import AwaitLoaderPlugin from "phaser3-rex-plugins/plugins/awaitloader-plugin";
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

const getGrid = async () => {
  const res = await fetch("/assets/island.txt");
  if (!res.ok) throw new Error(res.statusText);
  let text = await res.text();
  return text
    .split("\n")
    .filter((x) => x.length)
    .map((x) =>
      x
        .split(",")
        .filter((x) => x !== "")
        .map((x) => parseFloat(x))
    );
};

type Props = {
  data: any;
  error: any;
  isPending: any;
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
