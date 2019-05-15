var DOGINDEX = 0;
var INVINCIBLE = false;
var PLAYERHEALTH = BASEPLAYERHEALTH;

var LASTKEY = 3;
var ANIMATIONPLAYING = false;
var ITEMSCANCOLLECT = [0, 1, 2, 3, 4]

function createPlayer(scene, spawnX, spawnY) {

    scene.player = scene.physics.add.sprite(spawnX, spawnY, getDog(DOGINDEX)).setDepth(DEPTH.SPRITE);
    scene.physics.add.collider(scene.player, scene.collisionLayer);
    scene.player.body.setCollideWorldBounds(true);
    scene.player.body.setSize(112, 80);

    scene.healthBox = scene.add.graphics().setDepth(DEPTH.HEALTHBAR);
    scene.healthBox.fillStyle(0xff0000);
    scene.healthBox.fillRect(-64, -80, 128, 20);
    
    scene.healthBar = scene.add.graphics().setDepth(DEPTH.HEALTHBAR);
    scene.healthBar.fillStyle(0x008000);
    scene.healthBar.fillRect(-64, -80, 128, 20);

}

function updatePlayerFrames(player, scene) {

    if (scene.input.keyboard.addKey('A').isDown) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + 'moveLeft', true);
        }
        LASTKEY = 0;
    }
    else if (scene.input.keyboard.addKey('D').isDown) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + 'moveRight', true);
        }
        LASTKEY = 1;
    }
    else if (scene.input.keyboard.addKey('W').isDown) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + 'moveUp', true);
        }
        LASTKEY = 2;
    }
    else if (scene.input.keyboard.addKey('S').isDown) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + 'moveDown', true);
        }
        LASTKEY = 3;
    }
    else if (LASTKEY == 0) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + "moveLeftIdle");
        }
    }
    else if (LASTKEY == 1) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + "moveRightIdle");
        }
    }
    else if (LASTKEY == 2) {
        if (!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + "moveUpIdle");
        }
    }
    else {
        if(!ANIMATIONPLAYING) {
            player.anims.play(DOGINDEX + "moveDownIdle");
        }
    }

}

function updatePlayerMovement(player, scene) {

    player.body.setVelocity(0);
    var xVel = 0;
    var yVel = 0;

    if (scene.input.keyboard.addKey('A').isDown) {
        xVel -= 1;
    }
    if (scene.input.keyboard.addKey('D').isDown) {
        xVel += 1;
    }
    if (scene.input.keyboard.addKey('W').isDown) {
        yVel -= 1;
    }
    if (scene.input.keyboard.addKey('S').isDown) {
        yVel += 1;
    }

    var normalise = Math.sqrt(yVel * yVel + xVel * xVel);
    if (normalise != 0) {
        if (scene.input.keyboard.addKey('SHIFT').isDown) {
            player.body.setVelocityX(xVel / normalise * 1.9 * VELOCITY);
            player.body.setVelocityY(yVel / normalise * 1.9 * VELOCITY);
        }
        else {
            player.body.setVelocityX(xVel / normalise * VELOCITY);
            player.body.setVelocityY(yVel / normalise * VELOCITY);
        }
    }
    else {
        player.body.setVelocity(0);
    }

}

function updatePlayerHealth(scene, healthBox, healthBar, player) {

    if (PLAYERHEALTH <= 0) {
        PLAYERHEALTH = 0;
        processPlayerDeath(player, scene);
    }
    if (PLAYERHEALTH >= BASEPLAYERHEALTH) {
        PLAYERHEALTH = BASEPLAYERHEALTH;
    }
    var health = (PLAYERHEALTH / BASEPLAYERHEALTH) * 128;
    healthBar.clear();
    healthBar.fillStyle(0x008000);
    healthBar.fillRect(-64, -80, health, 20);
    healthBar.setX(player.x);
    healthBar.setY(player.y);
    healthBox.setX(player.x);
    healthBox.setY(player.y);

}

function updatePlayerActions(player, scene) {

    if (scene.input.keyboard.addKey('J').isDown) {
        scene.input.keyboard.removeKey('J');
        scene.sound.play('dogAttackSound', {
            volume: SOUNDVOLUME
        });
        if (LASTKEY == 0) {
            player.anims.play(DOGINDEX + "attackLeft");
            player.on('animationcomplete', animationComplete, scene);
            ANIMATIONPLAYING = true;
        }
        else if (LASTKEY == 1) {
            player.anims.play(DOGINDEX + "attackRight");
            player.on('animationcomplete', animationComplete, scene);
            ANIMATIONPLAYING = true;
        }
        else if (LASTKEY == 2) {
            player.anims.play(DOGINDEX + "attackUp");
            player.on('animationcomplete', animationComplete, scene);
            ANIMATIONPLAYING = true;
        }
        else {
            player.anims.play(DOGINDEX + "attackDown");
            player.on('animationcomplete', animationComplete, scene);
            ANIMATIONPLAYING = true;
        }
        var npcFile = processPlayerDirection(player, scene);
        if (npcFile != null) {
            attackEvent(scene, player, npcFile, 0);
            npcFile.attacked = true;
            npcFile.busy = true;
        }
    }

    if (scene.input.keyboard.addKey('K').isDown) {
        scene.input.keyboard.removeKey('K');
        var playerBounds = player.getBounds();
        for (var i = 0; i < scene.items.length; i++) {
            var item = scene.items[i];
            var itemBounds = item.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, itemBounds)) {
                var itemType = item.frame.name;
                if (ITEMSCANCOLLECT.includes(itemType)) {
                    item.destroy();
                    scene.sound.play('dogItemSound', {
                        volume: SOUNDVOLUME
                    });
                    scene.items.splice(i, 1);
                    changeReputation(1);
                    PLAYERHEALTH += 10;
                    break;
                }
            }
        }
        
    }

    if (scene.input.keyboard.addKey('L').isDown) {
        scene.input.keyboard.removeKey('L');
        scene.sound.play('dogBarkSound', {
            volume: SOUNDVOLUME
        });
        if (LASTKEY == 0) {
            player.anims.play(DOGINDEX + "barkLeft");
            player.on('animationcomplete', animationComplete, this);
            ANIMATIONPLAYING = true;
        }
        else if (LASTKEY == 1) {
            player.anims.play(DOGINDEX + "barkRight");
            player.on('animationcomplete', animationComplete, this);
            ANIMATIONPLAYING = true;
        }
        else if (LASTKEY == 2) {
            player.anims.play(DOGINDEX + "barkUp");
            player.on('animationcomplete', animationComplete, this);
            ANIMATIONPLAYING = true;
        }
        else {
            player.anims.play(DOGINDEX + "barkDown");
            player.on('animationcomplete', animationComplete, this);
            ANIMATIONPLAYING = true;
        }
        var npcFile = processPlayerDirection(player, scene);
        if (npcFile != null) {
            barkEvent(scene, npcFile);
            npcFile.attacked = false;
            npcFile.busy = true;
        }
    }

}

function animationComplete() {
    ANIMATIONPLAYING = false;
}

function processPlayerDirection(player, scene) {

    var playerBounds = player.getBounds();
    for (var i = 0; i < scene.npcs.length; i++) {
        var npc = scene.npcs[i].npc;
        var npcBounds = npc.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, npcBounds)) {
            if (LASTKEY == 0) {
                if (npc.x < player.x) {
                    return scene.npcs[i];
                }
            }
            else if (LASTKEY == 1) {
                if (player.x < npc.x) {
                    return scene.npcs[i];
                }
            }
            else if (LASTKEY == 2) {
                if (npc.y < player.y) {
                    return scene.npcs[i];
                }
            }
            else {
                if (player.y < npc.y) {
                    return scene.npcs[i];
                }
            }
        }
    }
    return null;

}

function processPlayerDeath(player, scene) {

    player.body.setVelocity(0);
    if (player.texture.key == 'pistachio') {
        player.anims.play('0dying', true);
        player.on('animationcomplete', function () {
            scene.sound.play('dogDyingSound', {
                volume: SOUNDVOLUME
            });
            loseLevel(scene);
        }, scene);
    }
    else if (player.texture.key == 'spot') {
        player.anims.play('1dying', true);
        player.on('animationcomplete', function () {
            scene.sound.play('dogDyingSound', {
                volume: SOUNDVOLUME
            });
            loseLevel(scene);
        }, scene);
    }
    else {
        player.anims.play('2dying', true);
        player.on('animationcomplete', function () {
            scene.sound.play('dogDyingSound', {
                volume: SOUNDVOLUME
            });
            loseLevel(scene);
        }, scene);
    }

}