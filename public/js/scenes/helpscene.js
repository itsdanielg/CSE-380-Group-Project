class helpScene extends Phaser.Scene {

    constructor() {
        super({
            key: "HELP"
        });
    }

    create() {

        // Add images/buttons

        var helpBG = this.add.image(0, 0, "helpBG");
        var backButton = this.add.image(0, 0, "backButton");

        // Scale Buttons

        helpBG.setScale(SCALE);
        backButton.setScale(SCALE);

        // Position Images

        helpBG.setPosition(WIDTH/2, HEIGHT/2);
        backButton.setPosition(80,650);

        // Pointer Events

        backButton.setInteractive({useHandCursor: true});
        backButton.on("pointerover", () => {
            backButton.setScale(SCALE_ENLARGE);
        })
        backButton.on("pointerout", () => {
            backButton.setScale(SCALE);
        })
        backButton.on("pointerup", () => {
            this.scene.stop();
            this.scene.resume("MENU");
        })

    }

}