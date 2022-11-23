import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { MapService } from "@src/services/map";
import { roundTo } from "@src/services/util";

// let tileSize = 16;
// let visibleWidth = 50;
// let visibleHeight = 32;

let tileSize = 8;
let visibleWidth = 100;
let visibleHeight = 64;

// let tileSize = 4;
// let visibleWidth = 200;
// let visibleHeight = 128;

// let tileSize = 2;
// let visibleWidth = 400;
// let visibleHeight = 256;

// let tileSize = 1;
// let visibleWidth = 800;
// let visibleHeight = 512;

let screenWidth = 800;
let screenHeight = 600;

let cols = 1152;
let rows = 1440;

let offsetX = Math.floor(cols / 2);
let offsetY = Math.floor(rows / 2);

console.log(offsetX)
export class Scene extends Phaser.Scene {
  private graphics: any;
  private board: any;
  private rexBoard!: BoardPlugin;
  private tileXYArray: any;
  private island: any;

  preload() {
    (this.load as any).rexAwait(
      (successCallback: any, failureCallback: any) => {
        MapService.getMap().then((resp) => {
          this.island = resp;
          successCallback();
        });
      }
    );
  }

  create() {
    this.cameras.main.setBounds(0, 0, screenWidth, screenHeight).setZoom(1);
    this.cameras.main.centerToBounds();
    this.graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });

    var centerRectSize = 2;
    this.add.rectangle(
      screenWidth / 2 - centerRectSize / 2,
      screenHeight / 2 - centerRectSize / 2,
      centerRectSize,
      centerRectSize,
      0xff0000
    );

    this.board = this.rexBoard.add
      .board({
        grid: {
          gridType: "hexagonGrid",
          x: 10,
          y: 0,
          size: (tileSize / 1.5),
          staggeraxis: "y" as any,
          staggerindex: "odd" as any,
        },
        width: visibleWidth,
        height: visibleHeight
      })
      .setInteractive()
      .on("tiledown", this.onTiledown.bind(this));
  }

  update() {
    this.graphics.clear();
    this.board.forEachTileXY((tileXY) => {
      this.drawTile(tileXY);
    });
  }

  drawTile(tileXY) {
    let points = this.board.getGridPoints(tileXY.x, tileXY.y, true);
    if (
      this.island[tileXY.x + offsetX] !== undefined &&
      this.island[tileXY.x + offsetX][tileXY.y + offsetY] != undefined
    ) {
      let tileValue = this.island[tileXY.x + offsetX][tileXY.y + offsetY];
      let tileColor = MapService.getTileColor(tileValue);
      this.graphics.fillStyle(tileColor).fillPoints(points);
      // this.graphics.strokePoints(points, true);
    }
  }

  onTiledown(pointer: any, tileXY: any) {
    const divisor = 2;
    let diffX = (visibleWidth / 2) - tileXY.x;
    let diffY = (visibleHeight / 2) - tileXY.y;
    if (diffX < 0) {
      diffX -= 1;
    }
    diffX = roundTo(diffX, 2);
    offsetX -= diffX;
    offsetY -= diffY;
  }
}
