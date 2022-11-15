import Phaser from "phaser";

let tileX = 0;
let tileY = 0;

let hexagonWidth = 80;
let hexagonHeight = 70;
let gridSizeX = 10;
let gridSizeY = 12;
let columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];
let moveIndex;
let sectorWidth = hexagonWidth/4*3;
let sectorHeight = hexagonHeight;
let gradient = (hexagonWidth/4)/(hexagonHeight/2);
let marker;
let hexagonGroup;


function checkHex() {
  var candidateX = Math.floor(
    (this.input.worldX - hexagonGroup.x) / sectorWidth
  );
  var candidateY = Math.floor(
    (this.input.worldY - hexagonGroup.y) / sectorHeight
  );
  var deltaX = (this.input.worldX - hexagonGroup.x) % sectorWidth;
  var deltaY = (this.input.worldY - hexagonGroup.y) % sectorHeight;
  if (candidateX % 2 == 0) {
    if (deltaX < hexagonWidth / 4 - deltaY * gradient) {
      candidateX--;
      candidateY--;
    }
    if (deltaX < -hexagonWidth / 4 + deltaY * gradient) {
      candidateX--;
    }
  } else {
    if (deltaY >= hexagonHeight / 2) {
      if (deltaX < hexagonWidth / 2 - deltaY * gradient) {
        candidateX--;
      }
    } else {
      if (deltaX < deltaY * gradient) {
        candidateX--;
      } else {
        candidateY--;
      }
    }
  }
  placeMarker(candidateX, candidateY);
}

function placeMarker(posX, posY) {
  if (
    posX < 0 ||
    posY < 0 ||
    posX >= gridSizeX ||
    posY > columns[posX % 2] - 1
  ) {
    marker.visible = false;
  } else {
    marker.visible = true;
    marker.x = (hexagonWidth / 4) * 3 * posX + hexagonWidth / 2;
    marker.y = hexagonHeight * posY;
    if (posX % 2 == 0) {
      marker.y += hexagonHeight / 2;
    } else {
      marker.y += hexagonHeight;
    }
  }
}

export class PhaserCustomScene extends Phaser.Scene {
  private camera: any;
  private graphics: any;
  private keys: any;
  private text: any;
  private cols = 50;
  private rows = 50;
  private tileSize = 64;
  private board: any;
  // private rexBoard: BoardPlugin | undefined;
  private tileXYArray: any;
  private bounds: any;
  private tile = { x: 0, y: 0 } as any;

  preload() {
    this.load.image("hexagon", "assets/hexagon.png");
    this.load.image("marker", "assets/marker.png");
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
      x: this.cols * this.tileSize,
      y: this.rows * this.tileSize,
    };
    // console.log(this.bounds);
    // cam.setBounds(0, 0, this.bounds.x, this.bounds.y).setZoom(1);
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


    hexagonGroup = this.add.group();
    this.backgroundColor = "#ffffff";
    for (var i = 0; i < gridSizeX / 2; i++) {
      for (var j = 0; j < gridSizeY; j++) {
        if (gridSizeX % 2 == 0 || i + 1 < gridSizeX / 2 || j % 2 == 0) {
          var hexagonX =
            hexagonWidth * i * 1.5 + (hexagonWidth / 4) * 3 * (j % 2);
          var hexagonY = (hexagonHeight * j) / 2;
          var hexagon = this.add.sprite(hexagonX, hexagonY, "hexagon");
          hexagonGroup.add(hexagon);
        }
      }
    }
    hexagonGroup.y =
      (this.height - hexagonHeight * Math.ceil(gridSizeY / 2)) / 2;
    if (gridSizeY % 2 == 0) {
      hexagonGroup.y -= hexagonHeight / 4;
    }
    hexagonGroup.x =
      (this.width -
        Math.ceil(gridSizeX / 2) * hexagonWidth -
        (Math.floor(gridSizeX / 2) * hexagonWidth) / 2) /
      2;
    if (gridSizeX % 2 == 0) {
      hexagonGroup.x -= hexagonWidth / 8;
    }
    // marker = this.add.sprite(0, 0, "marker");
    // marker.anchor.setTo(0.5);
    // marker.visible = false;
    // hexagonGroup.add(marker);
    // moveIndex = this.input.addMoveCallback(checkHex, this);

    // window.onload = function() {

    //   var game = new Phaser.Game(640, 480, Phaser.CANVAS, "", {preload: onPreload, create: onCreate});

    //   var hexagonWidth = 80;
    //   var hexagonHeight = 70;
    //   var gridSizeX = 10;
    //   var gridSizeY = 12;
    //   var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];
    //      var moveIndex;
    //      var sectorWidth = hexagonWidth/4*3;
    //      var sectorHeight = hexagonHeight;
    //      var gradient = (hexagonWidth/4)/(hexagonHeight/2);
    //      var marker;
    //      var hexagonGroup;

    // }
  }

  updateGrid() {}
}
