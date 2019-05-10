var WIDTH = 1280;
var HEIGHT = 720;
var SCALE = WIDTH/3000;
var SCALE_ENLARGE = SCALE + 0.1;
var DEPTH = {
    BACKGROUND: 0,
    COLLISION: 1,
    ITEM: 2,
    SPRITE: 3,
    HEALTHBAR: 4,
    OVERLAY: 5,
    OVERLAYTEXT: 6,
}
var FONT = 'Lato';
var WORDWRAPWIDTH = 260;
var GOODQUESTFILL = "#7CFC00";
var BADQUESTFILL = "#FF2D00";

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
        levelSixScene,
        completeScene, 
        failScene
    ]
};

var game = new Phaser.Game(config);