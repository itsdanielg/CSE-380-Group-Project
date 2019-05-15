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

function getTotalItems(scene, itemType) {
    var count = 0;
    for (var i = 0; i < scene.items.length; i++) {
        var item = scene.items[i];
        if (item.frame.name == itemType) {
            count++;
        }
    }
    return count;
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
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'attackUp',
        frames: [ { key: dogKey, frame: 30 } ],
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'attackLeft',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 36, end: 41 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'attackRight',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 42, end: 47 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'barkDown',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 48, end: 51 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'barkUp',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 54, end: 55 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'barkLeft',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 60, end: 61 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: dogIndex + 'barkRight',
        frames: scene.anims.generateFrameNumbers(dogKey, { start: 66, end: 67 }),
        frameRate: ENEMYATTACKFRAMERATE
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
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'ggAttackUp',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 45, end: 47 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'ggAttackLeft',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 54, end: 62 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'ggAttackRight',
        frames: scene.anims.generateFrameNumbers('goodguy', { start: 63, end: 71 }),
        frameRate: ENEMYATTACKFRAMERATE
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
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'bgAttackUp',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 45, end: 47 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'bgAttackLeft',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 54, end: 62 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'bgAttackRight',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 63, end: 71 }),
        frameRate: ENEMYATTACKFRAMERATE
    });
    scene.anims.create({
        key: 'bgDying',
        frames: scene.anims.generateFrameNumbers('badguy', { start: 72, end: 76 }),
        frameRate: ANIMATION_FRAME_RATE
    });
}

function resetAnims(scene) {
    scene.anims.remove('0moveDownIdle')
    scene.anims.remove('0moveDown')
    scene.anims.remove('0moveUpIdle')
    scene.anims.remove('0moveUp')
    scene.anims.remove('0moveLeftIdle')
    scene.anims.remove('0moveLeft')
    scene.anims.remove('0moveRightIdle')
    scene.anims.remove('0moveRight')
    scene.anims.remove('0attackDown')
    scene.anims.remove('0attackUp')
    scene.anims.remove('0attackLeft')
    scene.anims.remove('0attackRight')
    scene.anims.remove('0barkDown')
    scene.anims.remove('0barkUp')
    scene.anims.remove('0barkLeft')
    scene.anims.remove('0barkRight')
    scene.anims.remove('0dying')
    scene.anims.remove('1moveDownIdle')
    scene.anims.remove('1moveDown')
    scene.anims.remove('1moveUpIdle')
    scene.anims.remove('1moveUp')
    scene.anims.remove('1moveLeftIdle')
    scene.anims.remove('1moveLeft')
    scene.anims.remove('1moveRightIdle')
    scene.anims.remove('1moveRight')
    scene.anims.remove('1attackDown')
    scene.anims.remove('1attackUp')
    scene.anims.remove('1attackLeft')
    scene.anims.remove('1attackRight')
    scene.anims.remove('1barkDown')
    scene.anims.remove('1barkUp')
    scene.anims.remove('1barkLeft')
    scene.anims.remove('1barkRight')
    scene.anims.remove('1dying')
    scene.anims.remove('2moveDownIdle')
    scene.anims.remove('2moveDown')
    scene.anims.remove('2moveUpIdle')
    scene.anims.remove('2moveUp')
    scene.anims.remove('2moveLeftIdle')
    scene.anims.remove('2moveLeft')
    scene.anims.remove('2moveRightIdle')
    scene.anims.remove('2moveRight')
    scene.anims.remove('2attackDown')
    scene.anims.remove('2attackUp')
    scene.anims.remove('2attackLeft')
    scene.anims.remove('2attackRight')
    scene.anims.remove('2barkDown')
    scene.anims.remove('2barkUp')
    scene.anims.remove('2barkLeft')
    scene.anims.remove('2barkRight')
    scene.anims.remove('2dying')
    scene.anims.remove('ggMoveDownIdle');
    scene.anims.remove('ggMoveDown');
    scene.anims.remove('ggMoveUpIdle');
    scene.anims.remove('ggMoveUp');
    scene.anims.remove('ggMoveLeftIdle');
    scene.anims.remove('ggMoveLeft');
    scene.anims.remove('ggMoveRightIdle');
    scene.anims.remove('ggMoveRight');
    scene.anims.remove('ggAttackDown');
    scene.anims.remove('ggAttackUp');
    scene.anims.remove('ggAttackLeft');
    scene.anims.remove('ggAttackRight');
    scene.anims.remove('ggDying');
    scene.anims.remove('bgMoveDownIdle');
    scene.anims.remove('bgMoveDown');
    scene.anims.remove('bgMoveUpIdle');
    scene.anims.remove('bgMoveUp');
    scene.anims.remove('bgMoveLeftIdle');
    scene.anims.remove('bgMoveLeft');
    scene.anims.remove('bgMoveRightIdle');
    scene.anims.remove('bgMoveRight');
    scene.anims.remove('bgAttackDown');
    scene.anims.remove('bgAttackUp');
    scene.anims.remove('bgAttackLeft');
    scene.anims.remove('bgAttackRight');
    scene.anims.remove('bgDying');
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