class controlScene extends Phaser.Scene {

    constructor() {
        super({
            key: "CONTROLS"
        });
        this.sceneCalled = null;
    }

    create() {

        // Add images/buttons

        var controlsBG = this.add.image(0, 0, "controlsBG");
        var backButton = this.add.image(0, 0, "backButton");

        // Scale Buttons

        controlsBG.setScale(SCALE);
        backButton.setScale(SCALE);

        // Position Images

        controlsBG.setPosition(WIDTH/2, HEIGHT/2);
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
            this.scene.resume(this.sceneCalled)
        })

    }

}