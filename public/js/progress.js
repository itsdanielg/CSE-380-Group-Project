var progress = {
    NEW: true,
    SAVED: false,
    CURRENTLEVEL: "LEVELONE",
    CURRENTLEVELINDEX: 0,
    REPUTATION: 0
}

var SOUNDVOLUME = 10;
var MUSICVOLUME = 1;

function getDog(dogIndex) {
    var dogKey = "";
    if (dogIndex == 0) {
        dogKey = "pistachio";
    }
    else if (dogIndex == 1) {
        dogKey = "spot";
    }
    else {
        dogKey = "bear";
    }
    return dogKey;
}

function createDogAnimations(dogIndex, scene) {
    var dogKey = getDog(dogIndex);
    scene.anims.create({
        key: dogIndex + 'moveDownIdle',
        frames: [ { key: dogKey, frame: 0 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: dogIndex + 'moveDown',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 0, end: 1 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: dogIndex + 'moveUpIdle',
        frames: [ { key: dogKey, frame: 6 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: dogIndex + 'moveUp',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 6, end: 7 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: dogIndex + 'moveLeftIdle',
        frames: [ { key: dogKey, frame: 12 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: dogIndex + 'moveLeft',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 12, end: 13 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: dogIndex + 'moveRightIdle',
        frames: [ { key: dogKey, frame: 18 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: dogIndex + 'moveRight',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 18, end: 19 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: dogIndex + 'attackDown',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 24, end: 28 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'attackUp',
        frames: [ { key: dogKey, frame: 30 } ],
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'attackLeft',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 36, end: 41 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'attackRight',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 42, end: 47 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'barkDown',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 48, end: 51 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'barkUp',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 54, end: 55 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'barkLeft',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 60, end: 61 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'barkRight',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 66, end: 67 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: dogIndex + 'dying',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 72, end: 74 }),
        frameRate: ANIMATION_FRAME_RATE
    });
    
    
}

function createGoodGuyAnimations(scene) {
    scene.anims.create({
        key: 'ggMoveDownIdle',
        frames: [ { key: 'goodguy', frame: 0 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'ggMoveDown',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 0, end: 2 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'ggMoveUpIdle',
        frames: [ { key: 'goodguy', frame: 9 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'ggMoveUp',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 9, end: 11 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'ggMoveLeftIdle',
        frames: [ { key: 'goodguy', frame: 18 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'ggMoveLeft',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 18, end: 22 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'ggMoveRightIdle',
        frames: [ { key: 'goodguy', frame: 27 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'ggMoveRight',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 27, end: 31 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'ggAttackDown',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 36, end: 38 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'ggAttackUp',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 45, end: 47 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'ggAttackLeft',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 54, end: 62 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'ggAttackRight',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 63, end: 71 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'ggDying',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 72, end: 76 }),
        frameRate: ANIMATION_FRAME_RATE
    });
}

function createBadGuyAnimations(scene) {
    scene.anims.create({
        key: 'bgMoveDownIdle',
        frames: [ { key: 'badguy', frame: 0 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'bgMoveDown',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 0, end: 2 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'bgMoveUpIdle',
        frames: [ { key: 'badguy', frame: 9 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'bgMoveUp',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 9, end: 11 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'bgMoveLeftIdle',
        frames: [ { key: 'badguy', frame: 18 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'bgMoveLeft',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 18, end: 22 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'bgMoveRightIdle',
        frames: [ { key: 'badguy', frame: 27 } ],
        frameRate: ANIMATION_FRAME_RATE
    });
    scene.anims.create({
        key: 'bgMoveRight',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 27, end: 31 }),
        frameRate: ANIMATION_FRAME_RATE,
        repeat: -1
    });
    scene.anims.create({
        key: 'bgAttackDown',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 36, end: 38 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'bgAttackUp',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 45, end: 47 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'bgAttackLeft',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 54, end: 62 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'bgAttackRight',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 63, end: 71 }),
        frameRate: ANIMATION_FRAME_RATE + 10
    });
    scene.anims.create({
        key: 'bgDying',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 72, end: 76 }),
        frameRate: ANIMATION_FRAME_RATE
    });
}

function createLevelOverlay(scene) {

    // Text

    var reputationText = scene.add.text(170, 20, "Reputation", {
        fontFamily: FONT,
        fontSize: '22px',
        fill: '#ffffff'
    })
    reputationText.setDepth(DEPTH.OVERLAYTEXT);
    reputationText.setScrollFactor(0);
    reputationText.setStroke('black', 3);
    reputationText.setOrigin(0.5);

    // Reputation

    var reputationMeter = scene.add.image(170, 70, "reputationMeter");
    reputationMeter.setDepth(DEPTH.OVERLAY);
    reputationMeter.setScrollFactor(0);
    reputationMeter.setScale(SCALE);

    scene.currentReputation = scene.add.image(171, 69, "pauseSlider");
    scene.currentReputation.setDepth(DEPTH.OVERLAYTEXT);
    scene.currentReputation.setScrollFactor(0);
    scene.currentReputation.setScale(SCALE - 0.14);

    // Quest Box

    var questBox = scene.add.graphics().setDepth(DEPTH.OVERLAY);
    questBox.fillStyle(0x000000);
    questBox.setAlpha(0.4);
    questBox.fillRect(QUESTX, QUESTY, 300, 500);
    questBox.setScrollFactor(0);

    // Timer

    scene.timerText = scene.add.text(WIDTH/2, 30, "", {
        fontFamily: FONT,
        fontSize: '40px',
        fill: '#ffffff'
    })
    scene.timerText.setDepth(DEPTH.OVERLAYTEXT);
    scene.timerText.setScrollFactor(0);
    scene.timerText.setStroke('black', 3);
    scene.timerText.setOrigin(0.5);

}

function changeReputation(reputation) {

    progress.REPUTATION += reputation;
    if (progress.REPUTATION > MAXREPUTATION) {
        progress.REPUTATION = MAXREPUTATION;
    }
    else if (progress.REPUTATION < MINREPUTATION) {
        progress.REPUTATION = MINREPUTATION;
    }

}

function resetProgress() {

    progress.NEW = true;
    progress.REPUTATION = 0;

}

function loseLevel(scene) {

    scene.sound.play('levelLoseSound', {
        volume: SOUNDVOLUME
    });
    scene.scene.pause();
    scene.scene.launch("FAILED");
    scene.scene.bringToTop("FAILED");

}

function winLevel(scene) {

    scene.sound.play('levelWinSound', {
        volume: SOUNDVOLUME
    });
    scene.scene.pause();
    scene.scene.launch("COMPLETE");
    scene.scene.bringToTop("COMPLETE");

}

function nextLevel() {

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

function updateReputation(scene) {

    scene.currentReputation.setX(169 + progress.REPUTATION);

}

function updateTimer(scene) {

    scene.timerText.setText(Math.ceil(scene.seconds - scene.timer.getElapsedSeconds()));

}