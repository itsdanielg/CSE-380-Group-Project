class menuScene extends Phaser.Scene {

    constructor() {
        super({
            key: "MENU"
        });
        this.sceneLoaded = false;
        this.continueLevel = false;
        this.dogIndex = 0;
        this.levelIndex = 0;
        this.allDogs = []
        this.allDogsDescription = []
        this.allLevels = []
    }

    create() {

        // Reset Variables

        this.allDogs.length = 0;
        this.allDogsDescription.length = 0;
        this.allLevels.length = 0;

        // Add images/buttons/dogs/text

        var mainMenuBG = this.add.image(0, 0, "mainMenuBG");
        var startButton = this.add.image(0, 0, "startButton");
        var levelSelectButton = this.add.image(0, 0, "levelSelectButton");
        var controlsButton = this.add.image(0, 0, "controlsButton");
        var helpButton = this.add.image(0, 0, "helpButton");
        var leftButton = this.add.image(0, 0, "leftButton");
        var rightButton = this.add.image(0, 0, "rightButton");

        var dog1 = this.add.image(0, 0, "dog1");
        var dog2 = this.add.image(0, 0, "dog2");
        var dog3 = this.add.image(0, 0, "dog3");
        var description1 = this.add.image(0, 0, "description1");
        var description2 = this.add.image(0, 0, "description2");
        var description3 = this.add.image(0, 0, "description3");
        var currentLevel1 = this.add.image(0, 0, "currentLevelOne");
        var currentLevel2 = this.add.image(0, 0, "currentLevelTwo");
        var currentLevel3 = this.add.image(0, 0, "currentLevelThree");
        var currentLevel4 = this.add.image(0, 0, "currentLevelFour");
        var currentLevel5 = this.add.image(0, 0, "currentLevelFive");
        var currentLevel6 = this.add.image(0, 0, "currentLevelSix");
        this.allDogs.push(dog1, dog2, dog3);
        this.allDogsDescription.push(description1, description2, description3);
        this.allLevels.push(currentLevel1, currentLevel2, currentLevel3, currentLevel4, currentLevel5, currentLevel6);

        // Scale Buttons
        
        mainMenuBG.setScale(SCALE);
        startButton.setScale(SCALE);
        levelSelectButton.setScale(SCALE);
        controlsButton.setScale(SCALE);
        helpButton.setScale(SCALE);
        leftButton.setScale(SCALE);
        rightButton.setScale(SCALE);

        // Position Images

        mainMenuBG.setOrigin(0);

        var selectY = 640;
        var dogX = 925;
        var dogY = 420;
        var directButtonY = 400;
        var descriptionX = 320;
        var descriptionY = 350;
        var currentLevelX = 470;
        var currentLevelY = 490;
        
        startButton.setPosition(210, 490);
        levelSelectButton.setPosition(160, selectY);
        controlsButton.setPosition(310, selectY);
        helpButton.setPosition(460, selectY);
        leftButton.setPosition(665, directButtonY);
        rightButton.setPosition(1165, directButtonY);

        // Visible Elements

        this.allDogs.forEach(dog => {
            dog.setVisible(false);
            dog.setPosition(dogX, dogY);
            dog.setScale(SCALE);
        });
        this.allDogsDescription.forEach(dogDescription => {
            dogDescription.setVisible(false);
            dogDescription.setPosition(descriptionX, descriptionY);
            dogDescription.setScale(SCALE);
        });
        this.allLevels.forEach(level => {
            level.setVisible(false);
            level.setPosition(currentLevelX, currentLevelY);
            level.setScale(SCALE);
        });

        this.allDogs[this.dogIndex].setVisible(true);
        this.allDogsDescription[this.dogIndex].setVisible(true);
        if (this.continueLevel) {
            this.allLevels[this.levelIndex].setVisible(true);
        }

        // Pointer Events

        startButton.setInteractive({useHandCursor: true});
        startButton.on("pointerover", () => {
            startButton.setScale(SCALE_ENLARGE);
        })
        startButton.on("pointerout", () => {
            startButton.setScale(SCALE);
        })
        startButton.on("pointerup", () => {
            this.scene.start("LEVELONE");
        })

        levelSelectButton.setInteractive({useHandCursor: true});
        levelSelectButton.on("pointerover", () => {
            levelSelectButton.setScale(SCALE_ENLARGE);
        })
        levelSelectButton.on("pointerout", () => {
            levelSelectButton.setScale(SCALE);
        })
        levelSelectButton.on("pointerup", () => {
            this.scene.start("LEVELSELECT");
        })

        controlsButton.setInteractive({useHandCursor: true});
        controlsButton.on("pointerover", () => {
            controlsButton.setScale(SCALE_ENLARGE);
        })
        controlsButton.on("pointerout", () => {
            controlsButton.setScale(SCALE);
        })
        controlsButton.on("pointerup", () => {
            startButton.setVisible(false);
            levelSelectButton.setVisible(false);
            controlsButton.setVisible(false);
            helpButton.setVisible(false);
            leftButton.setVisible(false);
            rightButton.setVisible(false);
            this.scene.launch("CONTROLS");
        })

        helpButton.setInteractive({useHandCursor: true});
        helpButton.on("pointerover", () => {
            helpButton.setScale(SCALE_ENLARGE);
        })
        helpButton.on("pointerout", () => {
            helpButton.setScale(SCALE);
        })
        helpButton.on("pointerup", () => {
            startButton.setVisible(false);
            levelSelectButton.setVisible(false);
            controlsButton.setVisible(false);
            helpButton.setVisible(false);
            leftButton.setVisible(false);
            rightButton.setVisible(false);
            this.scene.launch("HELP");
        })

        leftButton.setInteractive({useHandCursor: true});
        leftButton.on("pointerover", () => {
            leftButton.setScale(SCALE_ENLARGE);
        })
        leftButton.on("pointerout", () => {
            leftButton.setScale(SCALE);
        })
        leftButton.on("pointerup", () => {
            this.changeDog(0);
        })

        rightButton.setInteractive({useHandCursor: true});
        rightButton.on("pointerover", () => {
            rightButton.setScale(SCALE_ENLARGE);
        })
        rightButton.on("pointerout", () => {
            rightButton.setScale(SCALE);
        })
        rightButton.on("pointerup", () => {
            this.changeDog(1);
        })

    }

    changeDog(buttonNum) {
        this.allDogs[this.dogIndex].setVisible(false);
        this.allDogsDescription[this.dogIndex].setVisible(false);
        if (buttonNum == 0) {
            this.dogIndex--;
            if (this.dogIndex < 0) {
                this.dogIndex = this.allDogs.length - 1;
            }
        }
        else {
            this.dogIndex++;
            if (this.dogIndex >= this.allDogs.length) {
                this.dogIndex = 0;
            }
        }
        this.allDogs[this.dogIndex].setVisible(true);
        this.allDogsDescription[this.dogIndex].setVisible(true);
    }
    
    playLevel(levelIndex) {
        switch (levelIndex) {
            case 0:
                return "LEVELONE";
            case 1:
                return "LEVELTWO";
            case 2:
                return "LEVELTHREE";
            case 3:
                return "LEVELFOUR";
            case 4:
                return "LEVELFIVE";
            case 5:
                return "LEVELSIX";
        }
    }

}