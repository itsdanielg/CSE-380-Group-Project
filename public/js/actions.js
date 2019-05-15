function pauseEvent(scene) {

    if (scene.input.keyboard.addKey('ESC').isDown) {
        scene.input.keyboard.removeKey('ESC');
        scene.scene.launch("PAUSE");
        scene.scene.pause();
        scene.scene.bringToTop("PAUSE");
    }

}

function attackEvent(scene, player, npc, event) {
    
    if (event == 0) {
        npc.health -= PLAYERDAMAGE;
    }
    else {
        if (npc.texture.key == 'badguy') {
            if (!INVINCIBLE) {
                PLAYERHEALTH -= HUMANDAMAGE;
            }
            scene.sound.play('humanPunchSound', {
                volume: SOUNDVOLUME,
                detune: -300
            });
        }
        else if (npc.texture.key == 'goodguy') {
            if (!INVINCIBLE) {
                PLAYERHEALTH -= (HUMANDAMAGE + 30);
            }
            scene.sound.play('humanPunchSound', {
                volume: SOUNDVOLUME,
                detune: -300
            });
        }
        else {
            if (!INVINCIBLE) {
                PLAYERHEALTH -= DOGDAMAGE;
            }
            scene.sound.play('dogAttackSound', {
                volume: SOUNDVOLUME,
                detune: 400
            });
        }
        scene.sound.play('dogDamagedSound', {
            volume: SOUNDVOLUME
        });
    }

}

function barkEvent(scene, npcFile) {

    var npc = npcFile.npc;
    npc.body.setCollideWorldBounds(false);
    var xVel = 0;
    var yVel = 0;
    npc.body.setVelocityX(xVel);
    npc.body.setVelocityY(yVel);
    xVel = VELOCITY + 200;
    yVel = VELOCITY + 200;
    if (LASTKEY == 0) {
        if (npc.texture.key == 'badguy') {
            npcFile.direction = "LEFT";
            npc.body.setVelocityX(-xVel);
            npc.anims.play('bgMoveLeft', true);
        }
        else if (npc.texture.key == 'goodguy') {
            npcFile.direction = "LEFT";
            npc.body.setVelocityX(-xVel);
            npc.anims.play('ggMoveLeft', true);
            changeReputation(-2);
        }
        else {
            npcFile.busy = true;
            npc.body.setVelocityX(0);
            npc.body.setVelocityY(0);
            if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveRight', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveRight', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveRight', true);
            }
            scene.time.delayedCall(200, function() {
                scene.sound.play('dogBarkSound', {
                    volume: SOUNDVOLUME
                });
                if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0barkRight', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1barkRight', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2barkRight', true);
                }
                changeReputation(-2);
                npcFile.busy = false;
            }, [], this);
        }
    }
    else if (LASTKEY == 1) {
        if (npc.texture.key == 'badguy') {
            npcFile.direction = "RIGHT";
            npc.body.setVelocityX(xVel);
            npc.anims.play('bgMoveRight', true);
        }
        else if (npc.texture.key == 'goodguy') {
            npcFile.direction = "RIGHT";
            npc.body.setVelocityX(xVel);
            npc.anims.play('ggMoveRight', true);
            changeReputation(-2);
        }
        else {
            npcFile.busy = true;
            npc.body.setVelocityX(0);
            npc.body.setVelocityY(0);
            if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveLeft', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveLeft', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveLeft', true);
            }
            scene.time.delayedCall(200, function() {
                scene.sound.play('dogBarkSound', {
                    volume: SOUNDVOLUME
                });
                if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0barkLeft', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1barkLeft', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2barkLeft', true);
                }
                changeReputation(-2);
                npcFile.busy = false;
            }, [], this);
        }
    }
    else if (LASTKEY == 2) {
        if (npc.texture.key == 'badguy') {
            npcFile.direction = "UP";
            npc.body.setVelocityY(-yVel);
            npc.anims.play('bgMoveUp', true);
        }
        else if (npc.texture.key == 'goodguy') {
            npcFile.direction = "UP";
            npc.body.setVelocityY(-yVel);
            npc.anims.play('ggMoveUp', true);
            changeReputation(-2);
        }
        else {
            npcFile.busy = true;
            npc.body.setVelocityX(0);
            npc.body.setVelocityY(0);
            if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveDown', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveDown', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveDown', true);
            }
            scene.time.delayedCall(200, function() {
                scene.sound.play('dogBarkSound', {
                    volume: SOUNDVOLUME
                });
                if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0barkDown', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1barkDown', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2barkDown', true);
                }
                changeReputation(-2);
                npcFile.busy = false;
            }, [], this);
        }
    }
    else {
        if (npc.texture.key == 'badguy') {
            npcFile.direction = "DOWN";
            npc.body.setVelocityY(yVel);
            npc.anims.play('bgMoveDown', true);
        }
        else if (npc.texture.key == 'goodguy') {
            npcFile.direction = "DOWN";
            npc.body.setVelocityY(yVel);
            npc.anims.play('ggMoveDown', true);
            changeReputation(-2);
        }
        else {
            npcFile.busy = true;
            npc.body.setVelocityX(0);
            npc.body.setVelocityY(0);
            if (npc.texture.key == 'pistachio') {
                npc.anims.play('0moveUp', true);
            }
            else if (npc.texture.key == 'spot') {
                npc.anims.play('1moveUp', true);
            }
            else if (npc.texture.key == 'bear') {
                npc.anims.play('2moveUp', true);
            }
            scene.time.delayedCall(200, function() {
                scene.sound.play('dogBarkSound', {
                    volume: SOUNDVOLUME
                });
                if (npc.texture.key == 'pistachio') {
                    npc.anims.play('0barkUp', true);
                }
                else if (npc.texture.key == 'spot') {
                    npc.anims.play('1barkUp', true);
                }
                else if (npc.texture.key == 'bear') {
                    npc.anims.play('2barkUp', true);
                }
                changeReputation(-2);
                npcFile.busy = false;
            }, [], this);
        }
    }

}