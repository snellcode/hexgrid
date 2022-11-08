import Phaser from "phaser";
import { HexagonMap } from "phaser3-rex-plugins/plugins/board-components.js";
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
// var config = {
//     // ...
//     plugins: {
//         scene: [{
//             key: 'rexBoard',
//             plugin: BoardPlugin,
//             mapping: 'rexBoard'
//         },
//         // ...
//         ]
//     }
//     // ...
// };
// var game = new Phaser.Game(config);

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("helloworld");
  }

  preload() {
    this.load.scenePlugin(
      "rexboardplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js",
      "rexBoard",
      "rexBoard"
    );

    // this.load.setBaseURL('https://labs.phaser.io')

    // this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    // this.load.image('red', 'assets/particles/red.png')
  }

  create() {
    console.log(this)
    // var config = {
    //   plugins: {
    //     scene: [
    //       {
    //         key: "rexBoard",
    //         plugin: BoardPlugin,
    //         mapping: "rexBoard",
    //       },
    //     ],
    //   },
    // };


var board = this.rexBoard.add.board({
    grid: {
        gridType: 'hexagonGrid',
        x: 100,
        y: 100,
        cellWidth: 10,
        cellHeight: 10,
        staggeraxis: 'x',   // 'x'|'y'
        staggerindex: 'odd' // 'odd'|'even'
    },
    // width: 0,
    // height: 0,
    // wrap: false,
    // infinity: false,
});



var tileXYArray = this.rexBoard.add.hexagonMap.hexagon(board, 10);

    // var board = this.scene.rexBoard.add.board(config);
    // var tileXYArray = HexagonMap.hexagon(board, 50);

    // var tileXYArray = scene.rexBoard.add.hexagonMap.parallelogram(board, type, width, height);
    // var tileXYArray = scene.rexBoard.add.hexagonMap.triangle(board, type, height);

    // this.createEmitter()
  }

  // createEmitter() {
  //   const particles = this.add.particles('red')

  //   const emitter = particles.createEmitter({
  //     speed: 100,
  //     scale: { start: 1, end: 0 },
  //     blendMode: 'ADD',
  //   })

  //   const logo = this.physics.add.image(400, 100, 'logo')

  //   logo.setVelocity(100, 200)
  //   logo.setBounce(1, 1)
  //   logo.setCollideWorldBounds(true)

  //   emitter.startFollow(logo)
  // }
}
