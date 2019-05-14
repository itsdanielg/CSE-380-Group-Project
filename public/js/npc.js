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
        direction: "DOWN",
        health: health,
        maxHealth: health,
        healthBox: healthBox,
        healthBar: healthBar,
        busy: false,
        attacked: false,
        reloading: false,
        chasing: true
    });
    return arcadeNPC;
}

function updateNPCMovement(scene, npc, npcFile){
    if (!npcFile.busy) {
        var move = Math.floor(Math.random() * 30);
        if (move < 1) {
            var direction = Math.floor(Math.random() * 4);
            var xVel = 0;
            var yVel = 0;
            npc.body.setVelocity(0);
            xVel = VELOCITY - 150;
            yVel = VELOCITY - 150;
            if (direction == 0) {
                npc.body.setVelocityX(-xVel);
                npcFile.direction = "LEFT";
            }
            else if (direction == 1) {
                npc.body.setVelocityX(xVel);
                npcFile.direction = "RIGHT";
            }
            else if (direction == 2) {
                npc.body.setVelocityY(-yVel);
                npcFile.direction = "UP";
            }
            else {
                npc.body.setVelocityY(yVel);
                npcFile.direction = "DOWN";
            }
            updateEnemyFrames(scene, npcFile);
        }
    }
}


function updateEnemyActions(scene, npcFile) {

    var npcAttacked = npcFile.attacked;
    if (npcAttacked) {
        var npc = npcFile.npc;
        var player = scene.player;
        var playerX = player.x;
        var playerY = player.y;
        var npcSpeed = VELOCITY + 20;
        scene.physics.moveTo(npc, playerX, playerY, npcSpeed);
        var npcCenterX = npc.getCenter().x;
        var npcCenterY = npc.getCenter().y;
        var playerCenterX = player.getCenter().x;
        var playerCenterY = player.getCenter().y;
        var distanceX = Math.abs(npcCenterX - playerCenterX);
        var distanceY = Math.abs(npcCenterY - playerCenterY);
        if (distanceX >= distanceY) {
            if (playerCenterX < npcCenterX) {
                npcFile.direction = "LEFT"
            }
            else {
                npcFile.direction = "RIGHT"
            }
        }
        else {
            if (playerCenterY < npcCenterY) {
                npcFile.direction = "UP"
            }
            else {
                npcFile.direction = "DOWN"
            }
        }
        if (isInRange(player, npcFile, scene)) {
            npcFile.chasing = false;
            npc.body.setVelocity(0);
            if (!npcFile.reloading) {
                attackEvent(scene, player, npc, 1);
                updateEnemyFrames(scene, npcFile);
                npcFile.reloading = true;
                scene.time.delayedCall(800/ENEMYATTACKSPEED, function() {
                    npcFile.reloading = false;
                });
            }
        }
        else {
            npcFile.chasing = true;
            updateEnemyFrames(scene, npcFile);
        }
    }

}

function updateEnemyFrames(scene, npcFile) {

    var npc = npcFile.npc;
    var direction = npcFile.direction;
    if (direction == "LEFT") {
        if (!npcFile.chasing) {
            if (!npcFile.reloading) {
                if (npc.texture.key == 'badguy') {
                    npc.anims.play('bgAttackLeft', true);
                }
                else if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0attackLeft', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1attackLeft', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2attackLeft', true);
                }
                else {
                    npc.anims.play('ggAttackLeft', true);
                }
            }
        }
        else {
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
    }
    else if (direction == "RIGHT") {
        if (!npcFile.chasing) {
            if (!npcFile.reloading) {
                if (npc.texture.key == 'badguy') {
                    npc.anims.play('bgAttackRight', true);
                }
                else if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0attackRight', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1attackRight', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2attackRight', true);
                }
                else {
                    npc.anims.play('ggAttackRight', true);
                }
            }
        }
        else {
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
    }
    else if (direction == "UP") {
        if (!npcFile.chasing) {
            if (!npcFile.reloading) {
                if (npc.texture.key == 'badguy') {
                    npc.anims.play('bgAttackUp', true);
                }
                else if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0attackUp', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1attackUp', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2attackUp', true);
                }
                else {
                    npc.anims.play('ggAttackUp', true);
                }
            }
        }
        else {
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
    }
    else {
        if (!npcFile.chasing) {
            if (!npcFile.reloading) {
                if (npc.texture.key == 'badguy') {
                    npc.anims.play('bgAttackDown', true);
                }
                else if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0attackDown', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1attackDown', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2attackDown', true);
                }
                else {
                    npc.anims.play('ggAttackDown', true);
                }
            }
        }
        else {
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

function processNPCEscape() {
    
}

function processNPCDeath(npcFile, scene) {

    var npc = npcFile.npc;
    var healthBox = npcFile.healthBox;
    var healthBar = npcFile.healthBar;
    npc.body.setVelocity(0);
    if (npc.texture.key == 'badguy') {
        npc.anims.play('bgDying', true);
        npc.on('animationcomplete', function () {
            scene.sound.play('humanDyingSound', {
                volume: SOUNDVOLUME
            });
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

function isInRange(player, npcFile, scene) {

    var playerBounds = player.getBounds();
    var npc = npcFile.npc;
    var npcBounds = npc.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, npcBounds)) {
        return true;
    }
    return false;

}
