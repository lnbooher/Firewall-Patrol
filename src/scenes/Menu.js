class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('popup', 'assets/popup.png');
        this.load.audio('sfx_select', './assets/singleClick.wav');
        this.load.audio('sfx_explosion', './assets/doubleClick.wav');
        this.load.audio('sfx_rocket', './assets/singleClick.wav');
    }

    create(){
        this.add.rectangle(0, 0, 640, 480, 0x008080).setOrigin(0 ,0);
        this.popup = this.add.tileSprite(0,0,640,480, 'popup').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
           game.settings = {
             spaceshipSpeed: 3,
             gameTimer: 60000    
           }
           this.sound.play('sfx_select');
           this.scene.start('playScene');    
         }
         if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000
              //gameTimer: 2000 //Debug time
           }
           this.sound.play('sfx_select');
           this.scene.start('playScene');    
         }
     }
}