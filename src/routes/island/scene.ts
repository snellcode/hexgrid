import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

let tileSize = 128;
let tileX = 0;
let tileY = 0;
let chunkSize = 13;
let offsetX = 0;
let offsetY = 0;
let speed = 2;

const getGrid = async () => {
  const cb = (new Date).getTime();
  const res = await fetch(`/assets/island.txt?${cb}`);
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

export class PhaserRexScene extends Phaser.Scene {
  private camera: any;
  private graphics: any;
  private board: any;
  private rexBoard: BoardPlugin | undefined;
  private tileXYArray: any;
  private bounds: any;
  private tile = { x: 0, y: 0 } as any;
  private island: any;
  private text: any;

  preload() {
    this.load.image("green", "/assets/green.png");
    this.load.image("hexagon", "/assets/hexagon-red.png");

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
    this.updateGrid();
  }

  createCamera() {
    this.camera = this.cameras.main;
    const cam = this.cameras.main;
    this.bounds = {
      x: chunkSize * tileSize * 11,
      y: chunkSize * tileSize * 12 - chunkSize * 50,
    };
    cam.setBounds(0, 0, this.bounds.x, this.bounds.y).setZoom(.1);
    this.cameras.main.centerToBounds();

    this.text = this.add
      // @ts-ignore
      .text(32, 32)
      .setScrollFactor(0)
      .setFontSize(32)
      .setColor("#ffffff");

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      let newZoom;

      if (deltaY > 0) {
        newZoom = this.camera.zoom - 0.05;
        if (newZoom > 0) {
          this.camera.zoom = Math.min(2, Math.max(.1, newZoom));
        }
      }

      if (deltaY < 0) {
        newZoom = this.camera.zoom + 0.05;
        this.camera.zoom = Math.min(2, Math.max(.1, newZoom));
      }
    });
  }

  drawIsland(tileXY, i) {
    let points = this.board.getGridPoints(
      tileXY.x,
      tileXY.y,
      true
    );
    if (
      this.island[tileXY.x + offsetX] !== undefined &&
      this.island[tileXY.x + offsetX][tileXY.y + offsetY] != undefined
    ) {
      let tileValue = this.island[tileXY.x + offsetX][tileXY.y + offsetY];
      let tileColor = getTileColor(tileValue);

      this.graphics.fillStyle(tileColor).fillPoints(points);
    }
  }

  drawGrid(i: any, tileXY: any, color: any) {
    let points = this.board.getGridPoints(
      tileXY.x,
      tileXY.y,
      true
    );
    this.graphics.lineStyle(1, color, 1.0);
    this.graphics.strokePoints(points, true);
    let worldXY = this.board.tileXYToWorldXY(tileXY.x, tileXY.y);
    this.add
      .text(worldXY.x, worldXY.y, `${tileXY.x},${tileXY.y}`)
      .setOrigin(0.5);
  }

  createRexPlugins() {
    const staggeraxis = "y" as any;
    const staggerindex = "odd" as any;

    if (!this.rexBoard) {
      return;
    }

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
      .on("tiledown", this.onTiledown.bind(this));

    this.tileXYArray = this.board.fit(
      this.rexBoard.hexagonMap.hexagon(this.board, chunkSize)
    );

    var tileXY, worldXY;

    for (var i in this.tileXYArray) {
      // @ts-ignore
      tileXY = this.tileXYArray[i];
      this.drawGrid(i, tileXY, 0xffff00);
    }

    this.rexBoard.createTileTexture(this.board, "tile", 0xffffff, 0xffffff, 3);

    this.board
      .forEachTileXY((tileXY, board) => {
        this.board.addChess(
          this.add.image(0, 0, "tile").setAlpha(0.125).setScale(1),

          tileXY.x,
          tileXY.y,
          0
        );
      }, this)
      .setInteractive()
      .on("tiledown", (pointer, tileXY) => {
        const centerX = Math.floor(800 / 2);
        const centerY = Math.floor(600 / 2);
        const tile = this.board.tileXYZToChess(tileXY.x, tileXY.y, 0);

        if (pointer.downX > centerX) {
          offsetX += speed
        }
        if (pointer.downY > centerY) {
          offsetY += speed
        }
        if (pointer.downX < centerX) {
          offsetX -= speed
        }
        if (pointer.downY < centerY) {
          offsetY -= speed
        }
      })
  }

  onTiledown(pointer: any, tileXY: any) {
    tileX = tileXY.x;
    tileY = tileXY.y;
  }

  createGraphics() {
    const cam = this.camera;
    const { width, height } = cam;

    this.graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });
  }

  createGrid() {
    this.createGraphics();
    this.createRexPlugins();
  }

  updateGrid() {
    var tileXY, worldXY;
    for (var i in this.tileXYArray) {
      // @ts-ignore
      tileXY = this.tileXYArray[i];
      this.drawIsland(tileXY, i)
    }
  }
}
