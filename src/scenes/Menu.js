class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/singleClick.wav');
        this.load.audio('sfx_explosion', './assets/doubleClick.wav');
        this.load.audio('sfx_rocket', './assets/singleClick.wav');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Consolas',
            fontSize: '28px',
            backgroundColor: '#1f0000',
            color: '#ff0000',
            align: 'right',
            padding: {
                 top: 5,
                 bottom: 5,
                },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'FIREWALL PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ← → arrows to move and F to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#1f0000';
        menuConfig.color = '#ff0000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
            
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