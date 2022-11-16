import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

let tileSize = 128;
let tileX = 0;
let tileY = 0;
// let chunkSize = 13;
let chunkSize = 3;

let ratio = 1;

if (chunkSize % 2 !== 0) {
  ratio = 1;
  if (chunkSize >= 5) {
    ratio = 1.25;
  }
  if (chunkSize >= 9) {
    ratio = 1.5;
  }
  if (chunkSize >= 11) {
    ratio = 1.835;
  }
  if (chunkSize >= 13) {
    ratio = 1.625;
  }
}

let offsetYRatio = chunkSize % 2 === 0 ? chunkSize / 2 : chunkSize / ratio;

let offsetX1 = 0;
let offsetY1 = 0;

let offsetX2 = -(chunkSize * 2);
let offsetY2 = 0;

let offsetX3 = chunkSize * 2;
let offsetY3 = 0;

let offsetX4 = -chunkSize;
let offsetY4 = -(chunkSize + offsetYRatio);

let offsetX5 = chunkSize;
let offsetY5 = -(chunkSize + offsetYRatio);

let offsetX6 = -chunkSize;
let offsetY6 = chunkSize + offsetYRatio;

let offsetX7 = chunkSize;
let offsetY7 = chunkSize + offsetYRatio;

const getGrid = async () => {
  const res = await fetch("assets/island.txt");
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

const clamps = [
  0.01, // water 0
  0.18, // grassland 1
  0.4, // plains 2
  0.6, // desert 3
  1.0, // mountains 4
];

const getTileColor = (value: any) => {
  if (value <= clamps[0]) {
    return 0x193298;
  }
  if (value > clamps[0] && value < clamps[1]) {
    return 0x085c00;
  }
  if (value > clamps[1] && value < clamps[2]) {
    return 0xa28456;
  }
  if (value > clamps[2] && value < clamps[3]) {
    return 0xe0bd91;
  }
  if (value > clamps[3] && value < clamps[4]) {
    return 0x584748;
  }
};

var getQuadGrid = function (scene) {
  var grid = scene.rexBoard.add.quadGrid({
    x: 400,
    y: 100,
    cellWidth: 100,
    cellHeight: 50,
    type: 1,
  });
  return grid;
};

var getHexagonGrid = function (scene) {
  var staggeraxis = "x";
  var staggerindex = "odd";
  var grid = scene.rexBoard.add.hexagonGrid({
    x: 100,
    y: 100,
    size: 30,
    // cellWidth: 72,
    // cellHeight: 72,
    staggeraxis: staggeraxis,
    staggerindex: staggerindex,
  });
  return grid;
};

export class PhaserRexScene extends Phaser.Scene {
  private camera: any;
  private graphics: any;
  private keys: any;
  private text: any;
  private cols = 50;
  private rows = 50;
  // private tileSize = 16;
  private board: any;
  private rexBoard: BoardPlugin | undefined;
  private tileXYArray: any;
  private bounds: any;
  private tile = { x: 0, y: 0 } as any;
  private island: any;

  preload() {
    this.load.image("green", "assets/green.png");
    this.load.image("hexagon", "assets/hexagon.png");

    (this.load as any).rexAwait(
      (successCallback: any, failureCallback: any) => {
        getGrid().then((resp) => {
          this.island = resp;
          successCallback();
        });
      }
    );
  }

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
      x: chunkSize * tileSize * 11,
      y: chunkSize * tileSize * 12 - chunkSize * 5,
    };
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

  drawGrid(i: any, tileXY: any, offsetX: any, offsetY: any, color: any) {
    let points = this.board.getGridPoints(
      tileXY.x + offsetX,
      tileXY.y + offsetY,
      true
    );

    this.graphics.lineStyle(1, color, 1.0);
    this.graphics.strokePoints(points, true);

    if (
      this.island[tileXY.x] !== undefined &&
      this.island[tileXY.x][tileXY.y] != undefined
    ) {
      let tileValue = this.island[tileXY.x][tileXY.y];
      let tileColor = getTileColor(tileValue);

      this.graphics.fillStyle(tileColor).fillPoints(points);
    }

    if (Math.floor((this.tileXYArray as any).length / 2) === parseInt(i, 10)) {
      this.graphics
        .fillStyle(0xffffff)
        .fillPoints(
          this.board.getGridPoints(tileXY.x + offsetX, tileXY.y + offsetY, true)
        );
    }

    let worldXY = this.board.tileXYToWorldXY(tileXY.x, tileXY.y);
    this.add
      .text(worldXY.x, worldXY.y, `${tileXY.x},${tileXY.y}`)
      .setOrigin(0.5);
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
            x: chunkSize * tileSize * 4,
            y: chunkSize * tileSize * 4,
            size: tileSize,
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
        this.rexBoard.hexagonMap.hexagon(this.board, chunkSize)
      );

      var tileXY, worldXY;

      for (var i in this.tileXYArray) {
        // @ts-ignore
        tileXY = this.tileXYArray[i];
        this.drawGrid(i, tileXY, offsetX1, offsetY1, 0xffff00);
      }
    }

    this.rexBoard.createTileTexture(this.board, "tile", 0xff0000, 0x0000ff, 3);

    this.board
      .forEachTileXY((tileXY, board) => {
        this.board.addChess(
          this.add.image(0, 0, "hexagon").setAlpha(0.25).setScale(1),

          tileXY.x,
          tileXY.y,
          0
        );
      }, this)
      .setInteractive()
      .on("tileover", (pointer, tileXY) => {
        var tile = this.board.tileXYZToChess(tileXY.x, tileXY.y, 0);
        if (tile) {
          tile.setAlpha(1);
        }
      })
      .on("tileout", (pointer, tileXY) => {
        var tile = this.board.tileXYZToChess(tileXY.x, tileXY.y, 0);
        if (tile) {
          tile.setAlpha(0.5);
        }
      });

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
        var newZoom = this.camera.zoom - 0.05;
        if (newZoom > 0) {
          this.camera.zoom = newZoom;
        }
      }

      if (deltaY < 0) {
        var newZoom = this.camera.zoom + 0.05;
        // if (newZoom < 1.3) {
          this.camera.zoom = newZoom;
        // }
      }
    });
  }

  updateGrid() {}
}
