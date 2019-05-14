class levelScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LEVELSELECT"
        });
    }

    create() {

        // Add images/buttons

        var levelSelectBG = this.add.image(0, 0, "levelSelectBG");
        var levelOneButton = this.add.image(0, 0, "levelOneButton");
        var levelTwoButton = this.add.image(0, 0, "levelTwoButton");
        var levelThreeButton = this.add.image(0, 0, "levelThreeButton");
        var levelFourButton = this.add.image(0, 0, "levelFourButton");
        var levelFiveButton = this.add.image(0, 0, "levelFiveButton");
        var levelSixButton = this.add.image(0, 0, "levelSixButton");
        var backButton = this.add.image(0, 0, "backButton");

        // Scale Buttons

        levelSelectBG.setScale(SCALE);
        levelOneButton.setScale(SCALE);
        levelTwoButton.setScale(SCALE);
        levelThreeButton.setScale(SCALE);
        levelFourButton.setScale(SCALE);
        levelFiveButton.setScale(SCALE);
        levelSixButton.setScale(SCALE);
        backButton.setScale(SCALE);

        // Position Images

        levelSelectBG.setOrigin(0);

        var centerX = WIDTH/2;
        var rowOffset = 280;
        var rowOneY = 250;
        var rowTwoY = rowOneY + rowOffset;
        var columnOffset = 350;
        var columnOneX = centerX - columnOffset;
        var columnThreeX = centerX + columnOffset;
        
        levelOneButton.setPosition(columnOneX, rowOneY);
        levelTwoButton.setPosition(centerX, rowOneY);
        levelThreeButton.setPosition(columnThreeX, rowOneY);
        levelFourButton.setPosition(columnOneX, rowTwoY);
        levelFiveButton.setPosition(centerX, rowTwoY);
        levelSixButton.setPosition(columnThreeX, rowTwoY);
        backButton.setPosition(50,670);

        // Pointer Events

        levelOneButton.setInteractive({useHandCursor: true});
        levelOneButton.on("pointerover", () => {
            levelOneButton.setScale(SCALE_ENLARGE);
        })
        levelOneButton.on("pointerout", () => {
            levelOneButton.setScale(SCALE);
        })
        levelOneButton.on("pointerup", () => {
            if (progress.SAVED) {
                progress.SAVED = false;
                this.scene.stop(progress.CURRENTLEVEL);
            }
            this.scene.start("LEVELONE");
        })

        levelTwoButton.setInteractive({useHandCursor: true});
        levelTwoButton.on("pointerover", () => {
            levelTwoButton.setScale(SCALE_ENLARGE);
        })
        levelTwoButton.on("pointerout", () => {
            levelTwoButton.setScale(SCALE);
        })
        levelTwoButton.on("pointerup", () => {
            if (progress.SAVED) {
                progress.SAVED = false;
                this.scene.stop(progress.CURRENTLEVEL);
            }
            this.scene.start("LEVELTWO");
        })

        levelThreeButton.setInteractive({useHandCursor: true});
        levelThreeButton.on("pointerover", () => {
            levelThreeButton.setScale(SCALE_ENLARGE);
        })
        levelThreeButton.on("pointerout", () => {
            levelThreeButton.setScale(SCALE);
        })
        levelThreeButton.on("pointerup", () => {
            if (progress.SAVED) {
                progress.SAVED = false;
                this.scene.stop(progress.CURRENTLEVEL);
            }
            this.scene.start("LEVELTHREE");
        })

        levelFourButton.setInteractive({useHandCursor: true});
        levelFourButton.on("pointerover", () => {
            levelFourButton.setScale(SCALE_ENLARGE);
        })
        levelFourButton.on("pointerout", () => {
            levelFourButton.setScale(SCALE);
        })
        levelFourButton.on("pointerup", () => {
            if (progress.SAVED) {
                progress.SAVED = false;
                this.scene.stop(progress.CURRENTLEVEL);
            }
            this.scene.start("LEVELFOUR");
        })

        levelFiveButton.setInteractive({useHandCursor: true});
        levelFiveButton.on("pointerover", () => {
            levelFiveButton.setScale(SCALE_ENLARGE);
        })
        levelFiveButton.on("pointerout", () => {
            levelFiveButton.setScale(SCALE);
        })
        levelFiveButton.on("pointerup", () => {
            if (progress.SAVED) {
                progress.SAVED = false;
                this.scene.stop(progress.CURRENTLEVEL);
            }
            this.scene.start("LEVELFIVE");
        })

        levelSixButton.setInteractive({useHandCursor: true});
        levelSixButton.on("pointerover", () => {
            levelSixButton.setScale(SCALE_ENLARGE);
        })
        levelSixButton.on("pointerout", () => {
            levelSixButton.setScale(SCALE);
        })
        levelSixButton.on("pointerup", () => {
            if (progress.SAVED) {
                progress.SAVED = false;
                this.scene.stop(progress.CURRENTLEVEL);
            }
            this.scene.start("LEVELSIX");
        })

        backButton.setInteractive({useHandCursor: true});
        backButton.on("pointerover", () => {
            backButton.setScale(SCALE_ENLARGE);
        })
        backButton.on("pointerout", () => {
            backButton.setScale(SCALE);
        })
        backButton.on("pointerup", () => {
            this.scene.start("MENU");
        })

    }

}