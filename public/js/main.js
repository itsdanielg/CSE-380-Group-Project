var WIDTH = 1280;
var HEIGHT = 720;
var SCALE = WIDTH/3000;
var SCALE_ENLARGE = SCALE + 0.1;

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        loadScene, 
        menuScene, 
        levelScene, 
        controlScene, 
        helpScene, 
        pauseScene, 
        cheatScene, 
        levelOneScene,
        levelTwoScene,
        levelThreeScene,
        levelFourScene,
        levelFiveScene,
        levelSixScene
    ]
};

var game = new Phaser.Game(config);