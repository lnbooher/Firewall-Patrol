class Play extends Phaser.Scene {
    constructor(){ 
        super("playScene");
        console.log("The scene is playing...");
    }

    //Preloads sprites
    preload(){
        this.load.image('background', 'assets/background.png');
        this.load.image('frame', 'assets/frame.png');
        this.load.image('endgoal', 'assets/endgoal.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('enemyfile', 'assets/enemyfile.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('placeholder', 'assets/placeholder.png');
        this.load.image('binaryA', 'assets/binaryA.png');
        this.load.image('binaryB', 'assets/binaryB.png');
        this.load.image('popup', 'assets/popup.png');
        this.load.image('gameOver', 'assets/gameOver.png');

        this.load.audio('bgmusic', ['assets/bgmusic.wav']);//Background music
        this.load.audio('backgroundTyping', ['assets/backgroundTyping.wav']);
        this.load.audio('doubleClick', ['assets/doubleClick.wav']);
        this.load.audio('singleClick', ['assets/singleClick.wav']);
    }

    //Create Function
    create(){
        //Background sprite
        this.background = this.add.tileSprite(0,0,640,480, 'background').setOrigin(0,0);
        //Binary sprite
        this.binaryA = this.add.tileSprite(0,0,640,480, 'binaryA').setOrigin(0,0);
        this.binaryB = this.add.tileSprite(0,0,640,480, 'binaryB').setOrigin(0,0);
        //Endgoal sprite
        this.endgoal = this.add.tileSprite(0,0,32,480, 'endgoal').setOrigin(0,0);
        //Rocket sprite
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5, 0);
        //Spaceship creation
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'enemyfile', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'enemyfile', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'enemyfile', 0, 10).setOrigin(0,0);

        //Music
        this.backgroundMusic = this.sound.add('bgmusic');
        var musicConfig = {
            mute: false,
            volume: .15,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.backgroundMusic.play(musicConfig);//Starts the music

        //Typing
        this.bgtyping = this.sound.add('backgroundTyping');
        var typingConfig = {
            mute: false,
            volume: .45,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bgtyping.play(typingConfig);//Starts the typing
        
        


        
       
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3, first: 0}),
            frameRate: 10
        });

        // initialize score
        this.p1Score = 0;

        //Score Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xAAAAAA).setOrigin(0,0);

        // display score
        let scoreConfig = {
        fontFamily: 'Consolas',
        fontSize: '28px',
        backgroundColor: '#CCCCCC',
        color: '#000000',
        align: 'center',
        padding: {
             top: 5,
             bottom: 5,
            },
        fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);



        // GAME OVER flag
        this.gameOver = false;

        //Game timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOver = this.add.tileSprite(0,0,640,480, 'gameOver').setOrigin(0,0);//EndGame Screen
            this.scoreCenter = this.add.text(game.config.width/2, game.config.height/2+50, this.p1Score, scoreConfig);
            this.backgroundMusic.stop(musicConfig);//Ends music loop on GAME OVER
            this.bgtyping.stop(typingConfig);//Ends typing loop
            //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 64, '(R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


        
        //Game borders. I have no idea but these cover gaps in my 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x404040).setOrigin(0 ,0);
        this.add.rectangle(0, 0, 2, game.config.height, 0x404040).setOrigin(0 ,0);
        //Background Frame
        this.frame = this.add.tileSprite(0,0,640,480, 'frame').setOrigin(0,0);
    }

    //Update Function
    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {

            this.scene.restart();
        }

        //Background Scroll
        this.background.tilePositionX +=4;
        this.binaryA.tilePositionX +=5;
        this.binaryB.tilePositionX +=6;

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    //Collision Function
    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    //Explosion Function
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
            });
        // score add and repaint
        this.p1Score += ship.points;            //Increase score
        ship.moveSpeed += .05;                  //Increase destroyed ship speed
        this.scoreLeft.text = this.p1Score;     //Score text update
        this.sound.play('sfx_explosion');       //Explosion sfx
        
        //Highscore attempt
        //this.hiScore += this.points;
        //this.highScoreFunc(this.hiScore);
        }
    
    highScoreFunc(scoreVar){
        
        console.log('High score: '+scoreVar);
    }
}