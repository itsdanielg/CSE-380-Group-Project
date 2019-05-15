class cheatScene extends Phaser.Scene {

    constructor() {
        super({
            key: "CHEAT"
        });
        this.message = ""
        this.text = null;
        this.nextLevel = "";
        this.invincible = INVINCIBLE;
        this.reputation = progress.REPUTATION;
    }

    create() {

        this.message = ""
        this.text = null;
        this.nextLevel = "";
        this.invincible = INVINCIBLE;
        this.reputation = progress.REPUTATION;

        // Add images/buttons

        var cheatBG = this.add.image(0, 0, "cheatBG").setDepth(-1);
        var submitButton = this.add.image(0, 0, "cheatSubmit");
        var exitButton = this.add.image(0, 0, "cheatExit");
        this.text = this.add.text(WIDTH/2, HEIGHT/2 - 20, this.message, {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.text.setStroke('black', 5);

        // Scale Buttons

        cheatBG.setScale(SCALE);
        submitButton.setScale(SCALE);
        exitButton.setScale(SCALE);

        // Position Images

        var textY = 480;
        var textXOffset = 140;

        cheatBG.setOrigin(0);
        submitButton.setPosition(WIDTH/2 - textXOffset, textY);
        exitButton.setPosition(WIDTH/2 + textXOffset, textY);

        // Pointer Events

        submitButton.setInteractive({useHandCursor: true});
        submitButton.on("pointerover", () => {
            submitButton.setScale(SCALE_ENLARGE);
        })
        submitButton.on("pointerout", () => {
            submitButton.setScale(SCALE);
        })
        submitButton.on("pointerup", () => {
            INVINCIBLE = this.invincible;
            changeReputation(this.reputation);
            if (this.nextLevel != "") {
                this.scene.stop("PAUSE");
                this.scene.stop(progress.CURRENTLEVEL);
                this.scene.start(this.nextLevel);
            }
            else {
                this.scene.stop();
                this.scene.stop("PAUSE");
                this.scene.resume(progress.CURRENTLEVEL);
            }
        })
        
        exitButton.setInteractive({useHandCursor: true});    
        exitButton.on("pointerover", () => {
            exitButton.setScale(SCALE_ENLARGE);
        })
        exitButton.on("pointerout", () => {
            exitButton.setScale(SCALE);
        })
        exitButton.on("pointerup", () => {
            this.scene.stop();
            this.scene.resume("PAUSE");
        })

    }

    update() {

        if (this.input.keyboard.addKey('ONE').isDown || this.input.keyboard.addKey('NUMPAD_ONE').isDown) {
            this.message = "Going to level one!";
            this.nextLevel = "LEVELONE";
        }
        else if (this.input.keyboard.addKey('TWO').isDown || this.input.keyboard.addKey('NUMPAD_TWO').isDown) {
            this.message = "Going to level two!";
            this.nextLevel = "LEVELTWO";
        }
        else if (this.input.keyboard.addKey('THREE').isDown || this.input.keyboard.addKey('NUMPAD_THREE').isDown) {
            this.message = "Going to level three!";
            this.nextLevel = "LEVELTHREE";
        }
        else if (this.input.keyboard.addKey('FOUR').isDown || this.input.keyboard.addKey('NUMPAD_FOUR').isDown) {
            this.message = "Going to level four!";
            this.nextLevel = "LEVELFOUR";
        }
        else if (this.input.keyboard.addKey('FIVE').isDown || this.input.keyboard.addKey('NUMPAD_FIVE').isDown) {
            this.message = "Going to level five!";
            this.nextLevel = "LEVELFIVE";
        }
        else if (this.input.keyboard.addKey('SIX').isDown || this.input.keyboard.addKey('NUMPAD_SIX').isDown) {
            this.message = "Going to level six!";
            this.nextLevel = "LEVELSIX";
        }

        if (this.input.keyboard.addKey('I').isDown) {
            this.input.keyboard.removeKey('I');
            if (this.invincible) {
                this.message = "Player is now vulnerable!";
            }
            else {
                this.message = "Player is now invincible!";
            }
            this.invincible = !this.invincible;
        }

        if (this.input.keyboard.addKey('Q').isDown) {
            this.input.keyboard.removeKey('Q');
            this.reputation += 5;
            if (this.reputation < MAXREPUTATION) {
                this.message = "Reputation increased!";
            }
            else {
                this.message = "Max reputation reached!";
            }
        }

        if (this.input.keyboard.addKey('E').isDown) {
            this.input.keyboard.removeKey('E');
            this.reputation -= 5;
            if (this.reputation > MINREPUTATION) {
                this.message = "Reputation decreased!";
            }
            else {
                this.message = "Min reputation reached!";
            }
        }

        this.text.setText(this.message);

    }

}