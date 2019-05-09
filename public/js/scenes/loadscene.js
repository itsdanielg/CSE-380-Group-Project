class loadScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LOAD",
            pack: {
                files: [
                    {
                        type: 'image',
                        key: 'loadingBackground',
                        url: 'assets/background/loadingscreen.png'
                    }
                ]
            }
        });
    }

    preload() {

        this.add.image(0, 0, "loadingBackground").setOrigin(0).setScale(SCALE);

        var centerX = WIDTH/2;
        var width = 900
        var height = 30;
        var loadingBox = this.add.graphics();
        var loadingBar = this.add.graphics();
        loadingBox.fillStyle(0xffffff);
        loadingBox.fillRect(centerX - width/2, 670, width, height);
        loadingBar.fillStyle(0x7f8fbc);

        // Backgrounds

        this.load.image('mainMenuBG', 'assets/background/menu.png');
        this.load.image('levelSelectBG', 'assets/background/levelselect.png');
        this.load.image('controlsBG', 'assets/background/controls.png');
        this.load.image('helpBG', 'assets/background/help.png');
        this.load.image('pauseBG', 'assets/background/pause.png');
        this.load.image('cheatBG', 'assets/background/cheat.png');
        this.load.image('completeBG', 'assets/background/complete.png');
        this.load.image('failedBG', 'assets/background/failed.png');

        // Buttons

        this.load.image('startButton', 'assets/buttons/start.png');
        this.load.image('levelSelectButton', 'assets/buttons/levelSelect.png');
        this.load.image('controlsButton', 'assets/buttons/controls.png');
        this.load.image('helpButton', 'assets/buttons/help.png');
        this.load.image('leftButton', 'assets/buttons/dog_left.png');
        this.load.image('rightButton', 'assets/buttons/dog_right.png');
        this.load.image('backButton', 'assets/buttons/back.png');
        this.load.image('levelOneButton', 'assets/buttons/lv1.png');
        this.load.image('levelTwoButton', 'assets/buttons/lv2.png');
        this.load.image('levelThreeButton', 'assets/buttons/lv3.png');
        this.load.image('levelFourButton', 'assets/buttons/lv4.png');
        this.load.image('levelFiveButton', 'assets/buttons/lv5.png');
        this.load.image('levelSixButton', 'assets/buttons/lv6.png');
        this.load.image('pauseResume', 'assets/buttons/pauseresume.png');
        this.load.image('pauseControl', 'assets/buttons/pausecontrol.png');
        this.load.image('pauseSave', 'assets/buttons/pausesavenexit.png');
        this.load.image('pauseExit', 'assets/buttons/pauseexit.png');
        this.load.image('pauseSlider', 'assets/buttons/sliderbutton.png');
        this.load.image('pauseCheats', 'assets/buttons/pausecheats.png');
        this.load.image('cheatSubmit', 'assets/buttons/cheatsubmit.png');
        this.load.image('cheatExit', 'assets/buttons/cheatexit.png');
        this.load.image('completeContinue', 'assets/buttons/completecontinue.png');
        this.load.image('failedRetry', 'assets/buttons/failedretry.png');

        // Dogs

        this.load.image('dog1', 'assets/dogs/dog1.png');
        this.load.image('dog2', 'assets/dogs/dog2.png');
        this.load.image('dog3', 'assets/dogs/dog3.png');

        // Text

        this.load.image('description1', 'assets/text/description1.png');
        this.load.image('description2', 'assets/text/description2.png');
        this.load.image('description3', 'assets/text/description3.png');
        this.load.image('currentLevelOne', 'assets/text/current1.png');
        this.load.image('currentLevelTwo', 'assets/text/current2.png');
        this.load.image('currentLevelThree', 'assets/text/current3.png');
        this.load.image('currentLevelFour', 'assets/text/current4.png');
        this.load.image('currentLevelFive', 'assets/text/current5.png');
        this.load.image('currentLevelSix', 'assets/text/current6.png');
        this.load.image('reputationMeter', 'assets/text/reputationmeter.png');

        // Spritesheets

        this.load.spritesheet('pistachio', 'assets/spritesheets/pistachiospritesheet.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('spot', 'assets/spritesheets/spotspritesheet.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('bear', 'assets/spritesheets/bearspritesheet.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('goodguy', 'assets/spritesheets/goodguyspritesheet.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('badguy', 'assets/spritesheets/badguyspritesheet.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('items', 'assets/spritesheets/itemspritesheet.png', { frameWidth: 64, frameHeight: 64 });

        // Tilemaps

        this.load.image('cityTiles', 'assets/spritesheets/tilespritesheet.png');
        this.load.tilemapTiledJSON("levelOneMap", "assets/tilemaps/levelone.json");
        // this.load.tilemapTiledJSON("levelTwoMap", "assets/tilemaps/leveltwo.json");
        // this.load.tilemapTiledJSON("levelThreeMap", "assets/tilemaps/levelthree.json");
        // this.load.tilemapTiledJSON("levelFourMap", "assets/tilemaps/levelfour.json");
        // this.load.tilemapTiledJSON("levelFiveMap", "assets/tilemaps/levelfive.json");
        // this.load.tilemapTiledJSON("levelSixMap", "assets/tilemaps/levelsix.json");

        // Sounds

        this.load.audio('dogAttackSound', 'assets/sounds/attacking.mp3');
        this.load.audio('dogItemSound', 'assets/sounds/item.mp3');
        this.load.audio('dogBarkSound', 'assets/sounds/barking.mp3');
        this.load.audio('dogDamagedSound', 'assets/sounds/damaged.mp3');
        this.load.audio('dogDyingSound', 'assets/sounds/dying.mp3');
        this.load.audio('humanPunchSound', 'assets/sounds/npc_punching.mp3');
        this.load.audio('humanDamagedSound', 'assets/sounds/npc_damaged.mp3');
        this.load.audio('humanDyingSound', 'assets/sounds/npc_dying.mp3');
        this.load.audio('questSound', 'assets/sounds/quest.mp3');
        this.load.audio('levelWinSound', 'assets/sounds/level_win.mp3');
        this.load.audio('levelLoseSound', 'assets/sounds/level_lose.mp3');
        
        // Progress Bar

        this.load.on("progress", (percentage) => {
            loadingBar.fillRect(centerX - width/2, 670, width * percentage, height);
        })
        this.load.on("complete", () => {
            this.scene.start("MENU");
        });

    }

}