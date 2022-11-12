import Phaser from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

const Random = Phaser.Math.Between;

// 1,152 columns by 1440 rows
// 1,658,880

export class CameraScene extends Phaser.Scene {
  private controls: any;
  private cursors: any;
  private keys: any;
  private text: any;
  private cols = 115;
  private rows = 144;
  private tileSize = 64;

  private rexBoard: BoardPlugin | undefined;
  constructor() {
    super({
      key: "examples",
    });
  }

  preload() {

  }

  create() {
    // @ts-ignore
     this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(32).setColor('#ffffff');
    const cursors = this.input.keyboard.createCursorKeys()
    this.keys = this.input.keyboard.addKeys('W,A,S,D');

    const cam = this.cameras.main
    cam.setBounds(0, 0, this.cols * this.tileSize, this.rows * this.tileSize).setZoom(1)

    // var g2 = this.add.grid(0, 0, this.cols * this.tileSize, this.rows * this.tileSize, this.tileSize, this.tileSize, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();

    for (let x = 0; x < this.cols; x++) { 
      for (let y = 0; y < this.rows; y++) { 

        if (this.cameras.main.worldView.contains(x * this.tileSize, y * this.tileSize)) {
          this.add.text(x * this.tileSize, y * this.tileSize, `${x},${y}`);
        }
      }
    }





  }

  update( )
  {

            const cam = this.cameras.main;

        this.text.setText([
            'ScrollX: ' + cam.scrollX,
            'ScrollY: ' + cam.scrollY,
            'MidX: ' + cam.midPoint.x,
            'MidY: ' + cam.midPoint.y
        ]);
    
        if (this.keys.A.isDown)
        {
            cam.scrollX -= 6;
        }
        else if (this.keys.D.isDown)
        {
            cam.scrollX += 6;
        }
    
        if (this.keys.W.isDown)
        {
            cam.scrollY -= 6;
        }
        else if (this.keys.S.isDown)
        {
            cam.scrollY += 6;
        }


  }

}
