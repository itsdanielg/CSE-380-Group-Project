class completeScene extends Phaser.Scene {

    constructor() {
        super({
            key: "COMPLETE"
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

        var completeBG = this.add.image(0, 0, "completeBG").setDepth(-1);
        var continueButton = this.add.image(0, 0, "completeContinue");
        var exitButton = this.add.image(0, 0, "cheatExit");
        this.text = this.add.text(WIDTH/2, HEIGHT/2 - 20, this.message, {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.text.setStroke('black', 5);

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
            this.scene.start(this.nextLevel());
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
            progress.CURRENTLEVEL = this.nextLevel();
            this.scene.start("MENU");
        })

    }

    nextLevel() {

        if (progress.CURRENTLEVEL == "LEVELONE") {
            return "LEVELTWO";
        }
        else if (progress.CURRENTLEVEL == "LEVELTWO") {
            return "LEVELTHREE";
        }
        else if (progress.CURRENTLEVEL == "LEVELTHREE") {
            return "LEVELFOUR";
        }
        else if (progress.CURRENTLEVEL == "LEVELFOUR") {
            return "LEVELFIVE";
        }
        else {
            return "LEVELSIX";
        }

    }

}