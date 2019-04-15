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

        this.load.image('mainMenuBG', 'assets/background/menu.png');
        this.load.image('levelSelectBG', 'assets/background/levelselect.png');
        this.load.image('controlsBG', 'assets/background/controls.png');
        this.load.image('helpBG', 'assets/background/help.png');
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
        this.load.image('dog1', 'assets/dogs/dog1.png');
        this.load.image('dog2', 'assets/dogs/dog2.png');
        this.load.image('dog3', 'assets/dogs/dog3.png');
        this.load.image('description1', 'assets/text/description1.png');
        this.load.image('description2', 'assets/text/description2.png');
        this.load.image('description3', 'assets/text/description3.png');
        this.load.image('currentLevelOne', 'assets/text/current1.png');
        this.load.image('currentLevelTwo', 'assets/text/current2.png');
        this.load.image('currentLevelThree', 'assets/text/current3.png');
        this.load.image('currentLevelFour', 'assets/text/current4.png');
        this.load.image('currentLevelFive', 'assets/text/current5.png');
        this.load.image('currentLevelSix', 'assets/text/current6.png');

        this.load.on("progress", (percentage) => {
            loadingBar.fillRect(centerX - width/2, 670, width * percentage, height);
        })

        this.load.on("complete", () => {
            loadingBox.destroy();
            loadingBar.destroy();
            this.scene.start("MENU");
        });

    }

}