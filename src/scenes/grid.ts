import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

const Random = Phaser.Math.Between;

export class GridScene extends Phaser.Scene {
  private cursors: any;
  private keys: any;
  private text: any;

  private rexBoard: BoardPlugin | undefined;
  constructor() {
    super({
      key: "examples",
    });
  }

  preload() {
    this.load.image("bg", "assets/uv-grid-diag.png");
    this.load.image("block", "assets/block.png");
  }

  create() {

    // @ts-ignore
    this.text = this.add.text(32, 32)
      .setScrollFactor(0)
      .setFontSize(32)
      .setColor("#ffffff");
    if (!this.rexBoard) {
      return;
    }

    var radius = 20;
    var hexSize = 30;

    var print = this.add.text(0, 0, "Click any tile");
    var staggeraxis = "y";
    var staggerindex = "odd";
    var board = this.rexBoard.add
      .board({
        grid: {
          gridType: "hexagonGrid",
          x: 0,
          y: 0,
          size: hexSize,
          staggeraxis: staggeraxis as any,
          staggerindex: staggerindex as any,
        },
      })
      .setInteractive()
      .on("tiledown", function (pointer: any, tileXY: any) {
        print.text = `${tileXY.x},${tileXY.y}`;
      });

    var tileXYArray = board.fit(
      this.rexBoard.hexagonMap.hexagon(board, radius)
    );

    var graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });
    var tileXY, worldXY;

    this.cameras.main.setBounds(
      0,
      0,
      radius * 4 * hexSize,
      radius * 4 * hexSize
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,A,S,D");

    // this.cameras.main.originX = 1;
    this.cameras.main.centerToBounds();

    for (var i in tileXYArray) {

      // @ts-ignore
      tileXY = tileXYArray[i];

      if (Math.floor((tileXYArray as any).length / 2) === parseInt(i, 10)) {
        graphics = this.add.graphics({
          lineStyle: {
            width: 1,
            color: 0x00ffff,
            alpha: 1,
          },
        });
      } else {
        var graphics = this.add.graphics({
          lineStyle: {
            width: 1,
            color: 0xffffff,
            alpha: 1,
          },
        });
      }
      if (this.cameras.main.worldView.contains(tileXY.x, tileXY.y)) {
        graphics.strokePoints(
          board.getGridPoints(tileXY.x, tileXY.y, true),
          true
        );
      }
    }
  }

  update() {
    const cam = this.cameras.main as any;

    this.text.setText([
      "ScrollX: " + cam.scrollX,
      "ScrollY: " + cam.scrollY,
      "MidX: " + cam.midPoint.x,
      "MidY: " + cam.midPoint.y,
    ]);

    if (this.keys.A.isDown) {
      cam.scrollX -= 6;
    } else if (this.keys.D.isDown) {
      cam.scrollX += 6;
    }

    if (this.keys.W.isDown) {
      cam.scrollY -= 6;
    } else if (this.keys.S.isDown) {
      cam.scrollY += 6;
    }

    if (this.cursors.left.isDown) {
      cam.rotation -= 0.01;
    } else if (this.cursors.right.isDown) {
      cam.rotation += 0.01;
    }
  }
}
