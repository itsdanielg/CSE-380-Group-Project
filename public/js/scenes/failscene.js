class failScene extends Phaser.Scene {

    constructor() {
        super({
            key: "FAILED"
        });
        this.message = ""
        this.text = null;
        this.nextLevel = "";
    }

    create() {

        this.message = ""
        this.text = null;
        this.nextLevel = "";

        // Add images/buttons

        var failedBG = this.add.image(0, 0, "failedBG").setDepth(-1);
        var retryButton = this.add.image(0, 0, "completeContinue");
        var exitButton = this.add.image(0, 0, "cheatExit");
        this.text = this.add.text(WIDTH/2, HEIGHT/2 - 20, this.message, {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.text.setStroke('black', 5);

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