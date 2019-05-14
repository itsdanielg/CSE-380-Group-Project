var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
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