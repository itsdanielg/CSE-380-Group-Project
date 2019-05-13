class failScene extends Phaser.Scene {

    constructor() {
        super({
            key: "FAILED"
        });
    }

    create() {

        // Add images/buttons

        var failedBG = this.add.image(0, 0, "failedBG").setDepth(-1);
        var retryButton = this.add.image(0, 0, "failedRetry");
        var exitButton = this.add.image(0, 0, "cheatExit");

        // Scale Buttons

        failedBG.setScale(SCALE);
        retryButton.setScale(SCALE);
        exitButton.setScale(SCALE);

        // Position Images

        var textY = 480;
        var textXOffset = 140;

        failedBG.setOrigin(0);
        retryButton.setPosition(WIDTH/2 - textXOffset, textY);
        exitButton.setPosition(WIDTH/2 + textXOffset, textY);

        // Pointer Events

        resetProgress();

        retryButton.setInteractive({useHandCursor: true});
        retryButton.on("pointerover", () => {
            retryButton.setScale(SCALE_ENLARGE);
        })
        retryButton.on("pointerout", () => {
            retryButton.setScale(SCALE);
        })
        retryButton.on("pointerup", () => {
            this.scene.stop(progress.CURRENTLEVEL);
            this.scene.start(progress.CURRENTLEVEL);
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

    }

}