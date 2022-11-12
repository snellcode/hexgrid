import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

const Random = Phaser.Math.Between;

const { Wrap } = Phaser.Math;
// const { black, white } = colors.hexColors;

const cellW = 100;
const cellH = 100;

// import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

// const Random = Phaser.Math.Between;

// 1,152 columns by 1440 rows
// 1,658,880

export class Demo1Scene extends Phaser.Scene {
  private controls: any;
  private cursors: any;
  private keys: any;
  private text: any;
  private player: any;
  private grid: any;
  private cols = 115;
  private rows = 144;
  private tileSize = 64;

  constructor() {
    super({
      key: "examples",
    });
  }

  preload() {}

  create() {
    var graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });

    // @ts-ignore
    this.text = this.add
      .text(32, 32)
      .setScrollFactor(0)
      .setFontSize(32)
      .setColor("#ffffff");
    let cursors, grid, player;
    this.keys = this.input.keyboard.addKeys("W,A,S,D");

    const cam = this.cameras.main;
    const { width, height } = cam;

    console.log(width, height);

    this.grid = this.add
      .grid(
        0,
        0,
        width + cellW,
        height + cellH,
        cellW,
        cellH,
        0x000000,
        1,
        0xffffff,
        1
      )
      .setAlpha(0.2)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add
      .image(400, 300, "block")
      .setMaxVelocity(960, 960);

    cam.startFollow(this.player, true, 0.1, 0.1);
  }

  update() {
    const cam = this.cameras.main;
    const { scrollX, scrollY } = this.cameras.main;

    this.grid.x = -Wrap(scrollX, 0, cellW);
    this.grid.y = -Wrap(scrollY, 0, cellH);

    this.player.setVelocity(0);

    this.text.setText([
      "ScrollX: " + cam.scrollX,
      "ScrollY: " + cam.scrollY,
      "MidX: " + cam.midPoint.x,
      "MidY: " + cam.midPoint.y,
    ]);

    if (this.keys.A.isDown) {
      this.player.x -= 10;
    } else if (this.keys.D.isDown) {
      this.player.x += 10;
    }

    if (this.keys.W.isDown) {
      this.player.y -= 10;
    } else if (this.keys.S.isDown) {
      this.player.y += 10;
    }
  }
}
