function createNPC(npc, scene, health) {
    var arcadeNPC = scene.physics.add.sprite(npc.x, npc.y, npc.texture.key).setDepth(DEPTH.SPRITE);
    scene.physics.add.collider(arcadeNPC, scene.collisionLayer);
    scene.physics.add.collider(arcadeNPC, scene.player);
    arcadeNPC.body.setCollideWorldBounds(true);
    arcadeNPC.setImmovable();
    var healthBox = scene.add.graphics().setDepth(DEPTH.HEALTHBAR);
    healthBox.fillStyle(0xff0000);
    healthBox.fillRect(-40, -80, 80, 20);
    var healthBar = scene.add.graphics().setDepth(DEPTH.HEALTHBAR);
    healthBar.fillStyle(0x008000);
    healthBar.fillRect(-40, -80, 80, 20);
    scene.npcs.push({
        npc: arcadeNPC,
        health: health,
        maxHealth: health,
        healthBox: healthBox,
        healthBar: healthBar
    });
    return arcadeNPC;
}

function updateNPCMovement(scene, npc){
    var move = Math.floor(Math.random() * 30);
    if (move < 1) {
        var direction = Math.floor(Math.random() * 4);
        var xVel = 0;
        var yVel = 0;
        npc.body.setVelocityX(xVel);
        npc.body.setVelocityY(yVel);
        xVel = VELOCITY - 150;
        yVel = VELOCITY - 150;
        if (direction == 0) {
            npc.body.setVelocityX(-xVel);
            if (npc.texture.key == 'badguy') {
                npc.anims.play('bgMoveLeft', true);
            }
            else if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveLeft', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveLeft', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveLeft', true);
            }
            else {
                npc.anims.play('ggMoveLeft', true);
            }
        }
        else if (direction == 1) {
            npc.body.setVelocityX(xVel);
            if (npc.texture.key == 'badguy') {
                npc.anims.play('bgMoveRight', true);
            }
            else if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveRight', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveRight', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveRight', true);
            }
            else {
                npc.anims.play('ggMoveRight', true);
            }
        }
        else if (direction == 2) {
            npc.body.setVelocityY(-yVel);
            if (npc.texture.key == 'badguy') {
                npc.anims.play('bgMoveUp', true);
            }
            else if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveUp', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveUp', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveUp', true);
            }
            else {
                npc.anims.play('ggMoveUp', true);
            }
        }
        else {
            npc.body.setVelocityY(yVel);
            if (npc.texture.key == 'badguy') {
                npc.anims.play('bgMoveDown', true);
            }
            else if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveDown', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveDown', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveDown', true);
            }
            else {
                npc.anims.play('ggMoveDown', true);
            }
        }
    }
}


function updateEnemyActions(scene, npc){

}

function updateEnemyHealth(npc, health, maxHealth, healthBox, healthBar) {

    if (health <= 0) {
        health = 0;
    }
    var npcHealth = (health / maxHealth) * 80;
    healthBar.clear();
    healthBar.fillStyle(0x008000);
    healthBar.fillRect(-40, -80, npcHealth, 20);
    healthBar.setX(npc.x);
    healthBar.setY(npc.y);
    healthBox.setX(npc.x);
    healthBox.setY(npc.y);

}

function processNPCDeath(npcFile, scene) {

    var npc = npcFile.npc;
    var healthBox = npcFile.healthBox;
    var healthBar = npcFile.healthBar;
    npc.setVelocityX(0);
    npc.setVelocityY(0);
    if (npc.texture.key == 'badguy') {
        npc.anims.play('bgDying', true);
        npc.on('animationcomplete', function () {
            scene.sound.play('humanDyingSound');
            npc.destroy();
            healthBox.destroy();
            healthBar.destroy();
            progress.REPUTATION += 10;
            scene.badNPCsLength--;
        }, scene);
    }
    else if (npc.texture.key == 'pistachio') {
        npc.anims.play('0dying', true);
        npc.on('animationcomplete', function () {
            scene.sound.play('dogDyingSound', {
                volume: SOUNDVOLUME
            });
            npc.destroy();
            healthBox.destroy();
            healthBar.destroy();
            progress.REPUTATION -= 5;
        }, scene);
    }
    else if (npc.texture.key == 'spot') {
        npc.anims.play('1dying', true);
        npc.on('animationcomplete', function () {
            scene.sound.play('dogDyingSound', {
                volume: SOUNDVOLUME
            });
            npc.destroy();
            healthBox.destroy();
            healthBar.destroy();
            progress.REPUTATION -= 5;
        }, scene);
    }
    else if (npc.texture.key == 'bear') {
        npc.anims.play('2dying', true);
        npc.on('animationcomplete', function () {
            scene.sound.play('dogDyingSound', {
                volume: SOUNDVOLUME
            });
            npc.destroy();
            healthBox.destroy();
            healthBar.destroy();
            progress.REPUTATION -= 5;
        }, scene);
    }
    else {
        npc.anims.play('ggDying', true);
        npc.on('animationcomplete', function () {
            scene.sound.play('humanDyingSound', {
                volume: SOUNDVOLUME
            });
            npc.destroy();
            healthBox.destroy();
            healthBar.destroy();
            progress.REPUTATION -= 10;
        }, scene);
    }

}
