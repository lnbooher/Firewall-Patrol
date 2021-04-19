//Name: Liam Booher
//Firewall Patrol (Rocket Patrol Mod)
//04/19/2021
//2.5 days to complete

/*********************************************************************************************************
Modifications:                                                                                           |
Starting Tier============================================================================================+
Add your own (copyright-free) background music to the Play scene (5)                                     |
Create a new scrolling tile sprite for the background (5)                                                |
Allow the player to control the Rocket after it's fired (5)                                              |
Novice Tier==============================================================================================+
Replace the UI borders with new artwork (10)                                                             |
Create a new title screen (e.g., new artwork, typography, layout) (10)                                   |
Implement parallax scrolling (10)                                                                        |
Intermediate Tier========================================================================================+
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20) |
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)                    |
=========================================================================================================+
Total: 85/100                                                                                            |
*********************************************************************************************************/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT;