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
        var soundX = (SOUNDVOLUME * 15.4) + 170;
        var musicX = (MUSICVOLUME * 15.4) + 740;

        pauseBG.setOrigin(0);
        resumeButton.setPosition(textX, textY);
        controlButton.setPosition(textX, textY + (1 * textYOffset));
        saveAndExitButton.setPosition(textX, textY + (2 * textYOffset));
        exitButton.setPosition(textX, textY + (3 * textYOffset));
        cheatsButton.setPosition(textX, textY + (4 * textYOffset));
        soundSlider.setPosition(soundX, textY + (6 * textYOffset) - 5);
        musicSlider.setPosition(musicX, textY + (6 * textYOffset) - 5);

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
            saveProgress(this);
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
            resetProgress();
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
        this.input.setDraggable(soundSlider);
        soundSlider.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            if (this.x < 170) {
                this.x = 170;
            }
            if (this.x > 555) {
                this.x = 555;
            }
            SOUNDVOLUME = (this.x - 170) / 15.4;
        });

        musicSlider.setInteractive({useHandCursor: true});
        this.input.setDraggable(musicSlider);
        musicSlider.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            if (this.x < 740) {
                this.x = 740;
            }
            if (this.x > 1125) {
                this.x = 1125;
            }
            MUSICVOLUME = (this.x - 740) / 15.4;
        });

    }

    update() {

        if (this.input.keyboard.addKey('ESC').isDown) {
            this.input.keyboard.removeKey('ESC');
            this.scene.stop();
            this.scene.resume(progress.CURRENTLEVEL);
        }
        
    }

}