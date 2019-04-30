class pauseScene extends Phaser.Scene {

    constructor() {
        super({
            key: "PAUSE"
        });
    }

    create() {

        // Add images/buttons

        var pauseBG = this.add.image(0, 0, "pauseBG").setDepth(-1);
        var resumeButton = this.add.image(0, 0, "pauseResume");
        var controlButton = this.add.image(0, 0, "pauseControl");
        var saveAndExitButton = this.add.image(0, 0, "pauseSave");
        var exitButton = this.add.image(0, 0, "pauseExit");
        var cheatsButton = this.add.image(0, 0, "pauseCheats");
        var soundSlider = this.add.image(0, 0, "pauseSlider");
        var musicSlider = this.add.image(0, 0, "pauseSlider");
        

        // Scale Buttons

        pauseBG.setScale(SCALE);
        resumeButton.setScale(SCALE);
        controlButton.setScale(SCALE);
        saveAndExitButton.setScale(SCALE);
        exitButton.setScale(SCALE);
        cheatsButton.setScale(SCALE);
        soundSlider.setScale(SCALE - 0.15);
        musicSlider.setScale(SCALE - 0.15);

        // Position Images

        var textX = WIDTH/2;
        var textY = 170;
        var textYOffset = 70;
        var textXOffset = 100;

        pauseBG.setOrigin(0);
        resumeButton.setPosition(textX, textY);
        controlButton.setPosition(textX, textY + (1 * textYOffset));
        saveAndExitButton.setPosition(textX, textY + (2 * textYOffset));
        exitButton.setPosition(textX, textY + (3 * textYOffset));
        cheatsButton.setPosition(textX, textY + (4 * textYOffset));
        soundSlider.setPosition(textX - textXOffset, textY + (6 * textYOffset) - 5);
        musicSlider.setPosition(textX + textXOffset, textY + (6 * textYOffset) - 5);

        // Pointer Events

        resumeButton.setInteractive({useHandCursor: true});
        resumeButton.on("pointerover", () => {
            resumeButton.setScale(SCALE_ENLARGE);
        })
        resumeButton.on("pointerout", () => {
            resumeButton.setScale(SCALE);
        })
        resumeButton.on("pointerup", () => {
            this.scene.stop();
            this.scene.resume(progress.CURRENTLEVEL);
        })
        
        controlButton.setInteractive({useHandCursor: true});    
        controlButton.on("pointerover", () => {
            controlButton.setScale(SCALE_ENLARGE);
        })
        controlButton.on("pointerout", () => {
            controlButton.setScale(SCALE);
        })
        controlButton.on("pointerup", () => {
            this.scene.launch("CONTROLS");
            this.scene.pause();
            var controlScene = this.scene.get("CONTROLS");
            controlScene.sceneCalled = "PAUSE";
            this.scene.bringToTop("CONTROLS");
        })

        saveAndExitButton.setInteractive({useHandCursor: true});
        saveAndExitButton.on("pointerover", () => {
            saveAndExitButton.setScale(SCALE_ENLARGE);
        })
        saveAndExitButton.on("pointerout", () => {
            saveAndExitButton.setScale(SCALE);
        })
        saveAndExitButton.on("pointerup", () => {
            this.scene.stop(progress.CURRENTLEVEL);
            this.scene.start("MENU");
        })

        exitButton.setInteractive({useHandCursor: true});
        exitButton.on("pointerover", () => {
            exitButton.setScale(SCALE_ENLARGE);
        })
        exitButton.on("pointerout", () => {
            exitButton.setScale(SCALE);
        })
        exitButton.on("pointerup", () => {
            this.scene.stop(progress.CURRENTLEVEL);
            this.scene.start("MENU");
        })

        cheatsButton.setInteractive({useHandCursor: true});
        cheatsButton.on("pointerover", () => {
            cheatsButton.setScale(SCALE_ENLARGE);
        })
        cheatsButton.on("pointerout", () => {
            cheatsButton.setScale(SCALE);
        })
        cheatsButton.on("pointerup", () => {
            this.scene.launch("CHEAT");
            this.scene.pause();
            this.scene.bringToTop("CHEAT");
        })
        
        soundSlider.setInteractive({useHandCursor: true});

        musicSlider.setInteractive({useHandCursor: true});

    }

    update() {

        // soundSlider.on("pointerup", () => {
        //     this.scene.launch("CHEAT");
        //     this.scene.pause();
        //     this.scene.bringToTop("CHEAT");
        // })

        // musicSlider.on("pointerup", () => {
        //     this.scene.launch("CHEAT");
        //     this.scene.pause();
        //     this.scene.bringToTop("CHEAT");
        // })

    }

}