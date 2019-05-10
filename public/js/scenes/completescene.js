class completeScene extends Phaser.Scene {

    constructor() {
        super({
            key: "COMPLETE"
        });
    }

    create() {

        // Add images/buttons

        var completeBG = this.add.image(0, 0, "completeBG").setDepth(-1);
        var continueButton = this.add.image(0, 0, "completeContinue");
        var exitButton = this.add.image(0, 0, "cheatExit");

        // Scale Buttons

        completeBG.setScale(SCALE);
        continueButton.setScale(SCALE);
        exitButton.setScale(SCALE);

        // Position Images

        var textY = 480;
        var textXOffset = 140;

        completeBG.setOrigin(0);
        continueButton.setPosition(WIDTH/2 - textXOffset, textY);
        exitButton.setPosition(WIDTH/2 + textXOffset, textY);

        // Pointer Events

        continueButton.setInteractive({useHandCursor: true});
        continueButton.on("pointerover", () => {
            continueButton.setScale(SCALE_ENLARGE);
        })
        continueButton.on("pointerout", () => {
            continueButton.setScale(SCALE);
        })
        continueButton.on("pointerup", () => {
            this.scene.stop(progress.CURRENTLEVEL);
            this.scene.start(nextLevel());
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
            progress.CURRENTLEVEL = nextLevel();
            this.scene.start("MENU");
        })

    }

}