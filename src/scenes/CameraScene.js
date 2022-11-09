export class CameraScene extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload () 
    {
        this.load.image('bg', 'assets/uv-grid-diag.png');
        this.load.image('block', 'assets/block.png');
    }

    create () 
    {
        this.cameras.main.setBounds(0, 0, 2024 * 2, 2024 * 2);

        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(2024, 0, 'bg').setOrigin(0);
        this.add.image(0, 2024, 'bg').setOrigin(0);
        this.add.image(2024, 2024, 'bg').setOrigin(0);
    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');
    
        // this.cameras.main.originX = 1;
        this.cameras.main.centerToBounds();
    
        this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(32).setColor('#ffffff');
    }

    update () 
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
    
        if (this.cursors.left.isDown)
        {
            cam.rotation -= 0.01;
        }
        else if (this.cursors.right.isDown)
        {
            cam.rotation += 0.01;
        }
    }
}


