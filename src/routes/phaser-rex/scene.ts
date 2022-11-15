import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

let tileX = 0;
let tileY = 0;

export class PhaserRexScene extends Phaser.Scene {
  private camera: any;
  private graphics: any;
  private keys: any;
  private text: any;
  private cols = 50;
  private rows = 50;
  private tileSize = 64;
  private board: any;
  private rexBoard: BoardPlugin | undefined;
  private tileXYArray: any;
  private bounds: any;
  private tile = { x: 0, y: 0 } as any;

  preload() {}

  create() {
    this.createCamera();
    this.createGrid();
  }

  update() {
    this.updateCamera();
    this.updateGrid();
  }

  createCamera() {
    this.camera = this.cameras.main;
    const cam = this.cameras.main;
    this.bounds = {
      x: this.cols * this.tileSize,
      y: this.rows * this.tileSize,
    };
    console.log(this.bounds);
    cam.setBounds(0, 0, this.bounds.x, this.bounds.y).setZoom(1);
    this.cameras.main.centerToBounds();

    this.text = this.add
      // @ts-ignore
      .text(32, 32)
      .setScrollFactor(0)
      .setFontSize(32)
      .setColor("#ffffff");
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
  }

  updateCamera() {
    const cam = this.camera;

    if (this.keys.A.isDown) {
      this.camera.scrollX -= 6;
    } else if (this.keys.D.isDown) {
      this.camera.scrollX += 6;
    }

    if (this.keys.W.isDown) {
      this.camera.scrollY -= 6;
    } else if (this.keys.S.isDown) {
      this.camera.scrollY += 6;
    }

    this.text.setText([
      "ScrollX: " + cam.scrollX,
      "ScrollY: " + cam.scrollY,
      "MidX: " + cam.midPoint.x,
      "MidY: " + cam.midPoint.y,
      "tileX " + tileX,
      "tileY " + tileY,
    ]);
  }

  createGrid() {
    const cam = this.camera;
    const { width, height } = cam;
    const staggeraxis = "y" as any;
    const staggerindex = "odd" as any;

    this.graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });

    if (this.rexBoard) {
      this.board = this.rexBoard.add
        .board({
          grid: {
            gridType: "hexagonGrid",
            x: 0,
            y: 0,
            size: this.tileSize,
            staggeraxis: staggeraxis,
            staggerindex: staggerindex,
          },
        })
        .setInteractive()
        .on("tiledown", function (pointer: any, tileXY: any) {
          tileX = tileXY.x;
          tileY = tileXY.y;
        });
    }

    if (this.board && this.rexBoard) {
      this.tileXYArray = this.board.fit(
        this.rexBoard.hexagonMap.hexagon(this.board, this.cols / 4)
      );

      var tileXY, worldXY;

      for (var i in this.tileXYArray) {
        // @ts-ignore
        tileXY = this.tileXYArray[i];
        if (
          Math.floor((this.tileXYArray as any).length / 2) === parseInt(i, 10)
        ) {
          this.graphics.lineStyle(1, 0x00ffff, 1.0);
        } else {
          this.graphics.lineStyle(1, 0xffffff, 1.0);
        }

        this.graphics.strokePoints(
          this.board.getGridPoints(tileXY.x, tileXY.y, true),
          true
        );
      }
    }
  }

  updateGrid() {}
}
