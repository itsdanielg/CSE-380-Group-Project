var VELOCITY = 250;
var DOGINDEX = 0;
var INVINCIBLE = false;
var PLAYERHEALTH = 500;
var PLAYERDAMAGE = 100;

var LASTKEY = 3;
var ANIMATIONPLAYING = false;

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

function updatePlayerFrames(player, scene) {
    if (!ANIMATIONPLAYING) {
        if (scene.input.keyboard.addKey('A').isDown) {
            player.anims.play(DOGINDEX + 'moveLeft', true);
            LASTKEY = 0;
        }
        else if (scene.input.keyboard.addKey('D').isDown) {
            player.anims.play(DOGINDEX + 'moveRight', true);
            LASTKEY = 1;
        }
        else if (scene.input.keyboard.addKey('W').isDown) {
            player.anims.play(DOGINDEX + 'moveUp', true);
            LASTKEY = 2;
        }
        else if (scene.input.keyboard.addKey('S').isDown) {
            player.anims.play(DOGINDEX + 'moveDown', true);
            LASTKEY = 3;
        }
        else if (LASTKEY == 0) {
            player.anims.play(DOGINDEX + "moveLeftIdle");
        }
        else if (LASTKEY == 1) {
            player.anims.play(DOGINDEX + "moveRightIdle");
        }
        else if (LASTKEY == 2) {
            player.anims.play(DOGINDEX + "moveUpIdle");
        }
        else {
            player.anims.play(DOGINDEX + "moveDownIdle");
        }
    }
}

function updatePlayerMovement(player, scene) {
    var xVel = 0;
    var yVel = 0;

    player.body.setVelocityX(xVel);
    player.body.setVelocityY(yVel);

    if (scene.input.keyboard.addKey('SHIFT').isDown) {
        xVel = VELOCITY * 1.9;
        yVel = VELOCITY * 1.9;
    }
    else {
        xVel = VELOCITY;
        yVel = VELOCITY;
    }

    if (scene.input.keyboard.addKey('A').isDown) {
        player.body.setVelocityX(-xVel);
    }
    else if (scene.input.keyboard.addKey('D').isDown) {
        player.body.setVelocityX(xVel);
    }
    if (scene.input.keyboard.addKey('W').isDown) {
        player.body.setVelocityY(-yVel);
    }
    else if (scene.input.keyboard.addKey('S').isDown) {
        player.body.setVelocityY(yVel);
    }
}

function updatePlayerHealth(healthBox, healthBar, player) {

    if (PLAYERHEALTH <= 0) {
        PLAYERHEALTH = 0;
    }
    var health = (PLAYERHEALTH / 500) * 128;
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
        scene.sound.play('dogAttackSound');
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
        var npc = processPlayerDirection(player, scene);
        if (npc != null) {
            attackEvent(player, npc, 0, this);
        }
    }
    if (scene.input.keyboard.addKey('K').isDown) {
        scene.input.keyboard.removeKey('K');
        var playerBounds = player.getBounds();
        for (var i = 0; i < scene.items.length; i++) {
            var item = scene.items[i];
            var itemBounds = item.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, itemBounds)) {
                item.destroy();
                scene.sound.play('dogItemSound');
                scene.items.splice(i, 1);
                changeReputation(1);
                break;
            }
        }
        
    }
    if (scene.input.keyboard.addKey('L').isDown) {
        scene.input.keyboard.removeKey('L');
        scene.sound.play('dogBarkSound');
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