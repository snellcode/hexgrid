import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

const Random = Phaser.Math.Between;

export class GridScene extends Phaser.Scene {
  private rexBoard: BoardPlugin | undefined;
  constructor() {
    super({
      key: "examples",
    });
  }

  preload() {}
  create() {
    if (!this.rexBoard) {
      return
    }
    var print = this.add.text(0, 0, "Click any tile");
    var staggeraxis = "y";
    var staggerindex = "odd";
    var board = this.rexBoard.add
      .board({
        grid: {
          gridType: "hexagonGrid",
          x: 60,
          y: 60,
          size: 20,
          staggeraxis: staggeraxis as any,
          staggerindex: staggerindex as any
        },
      })
      .setInteractive()
      .on("tiledown", function (pointer: any, tileXY: any) {
        print.text = `${tileXY.x},${tileXY.y}`;
      });

    var tileXYArray = board.fit(this.rexBoard.hexagonMap.hexagon(board, 4));

    var graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });
    var tileXY, worldXY;
    for (var i in tileXYArray) {
      
      // @ts-ignore
      tileXY = tileXYArray[i];
      
      graphics.strokePoints(
        board.getGridPoints(tileXY.x, tileXY.y, true),
        true
      );

      worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y);
      this.add
        .text(worldXY.x, worldXY.y, `${tileXY.x},${tileXY.y}`)
        .setOrigin(0.5);
    }
  }

  update() {}
}
