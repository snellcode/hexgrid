import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

let tileSize = 16;
let tileX = 0;
let tileY = 0;
let chunkSize = 13;

let ratio = 1;

if (chunkSize % 2 !== 0) {
  ratio = 1
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

let offsetX2 = - (chunkSize * 2);
let offsetY2 = 0;

let offsetX3 = chunkSize * 2;
let offsetY3 = 0;

let offsetX4 = - chunkSize;
let offsetY4 = - (chunkSize + offsetYRatio);

let offsetX5 = chunkSize;
let offsetY5 = - (chunkSize + offsetYRatio);

let offsetX6 = -chunkSize;
let offsetY6 = chunkSize + offsetYRatio;

let offsetX7 = chunkSize;
let offsetY7 = chunkSize + offsetYRatio;

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
      x: chunkSize * tileSize * 11,
      y: chunkSize * tileSize * 12 - (chunkSize * 5),
    };
    // console.log(this.bounds);
    cam.setBounds(0, 0, this.bounds.x, this.bounds.y).setZoom(1);
    this.cameras.main.centerToBounds();

    this.text = this.add
      // @ts-ignore
      .text(32, 32)
      .setScrollFactor(0)
      .setFontSize(32)
      .setColor("#ffffff");
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
      this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      let newZoom;

      if (deltaY > 0) {
        newZoom = this.camera.zoom - 0.05;
        if (newZoom > 0) {
          this.camera.zoom = newZoom;
        }
      }

      if (deltaY < 0) {
        newZoom = this.camera.zoom + 0.05;
        // if (newZoom < 1.3) {
        this.camera.zoom = newZoom;
        // }
      }
    });
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
  }

  drawGrid(i: any, tileXY: any, offsetX: any, offsetY: any, color: any) {
    this.graphics.lineStyle(1, color, 1.0);
    this.graphics.strokePoints(
      this.board.getGridPoints(tileXY.x + offsetX, tileXY.y + offsetY, true),
      true
    );
    if (Math.floor((this.tileXYArray as any).length / 2) === parseInt(i, 10)) {
      this.graphics
        .fillStyle(0xffffff)
        .fillPoints(
          this.board.getGridPoints(
            tileXY.x + offsetX,
            tileXY.y + offsetY,
            true
          )
        );
    }
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
        this.drawGrid(i, tileXY, offsetX2, offsetY2, 0xffffff);
        this.drawGrid(i, tileXY, offsetX3, offsetY3, 0xff00ff);
        this.drawGrid(i, tileXY, offsetX4, offsetY4, 0xff00ff);
        this.drawGrid(i, tileXY, offsetX5, offsetY5, 0xffffff);
        this.drawGrid(i, tileXY, offsetX6, offsetY6, 0xff00ff);
        this.drawGrid(i, tileXY, offsetX7, offsetY7, 0xffffff); 
      }
    }
  }

  updateGrid() {}
}
