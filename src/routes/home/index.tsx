import { h } from "preact";
import style from "./style.css";
import { useEffect } from "preact/hooks";
import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { GridScene } from "@src/scenes/GridScene";

let game: any;
var config = {
  type: Phaser.AUTO,
  parent: "phaser-container",

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  scene: GridScene,
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

const Home = () => {
  useEffect(() => {
    console.log("useEffect running");
    if (game) {
      // not working:
      // game.destroy();
      // (document.getElementById("phaser-container") as any).innerHTML = "";

      // so just reload the page
      location.reload();
    }
    game = new Phaser.Game(config);
  });

  return <div id="phaser-container"></div>;
};

export default Home;