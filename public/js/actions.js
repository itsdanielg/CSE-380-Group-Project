function pauseEvent(scene) {

    if (scene.input.keyboard.addKey('ESC').isDown) {
        scene.input.keyboard.removeKey('ESC');
        scene.scene.launch("PAUSE");
        scene.scene.pause();
        scene.scene.bringToTop("PAUSE");
    }

}

function attackEvent(player, npc, event, scene) {
    
    if (event == 0) {
        npc.health -= PLAYERDAMAGE;
    }
    else {
        if (npc.texture.key == 'badguy') {
            PLAYERHEALTH -= HUMANDAMAGE;
        }
        else if (npc.texture.key == 'goodguy') {
            PLAYERHEALTH -= (HUMANDAMAGE + 30);
        }
        else {
            PLAYERHEALTH -= DOGDAMAGE;
        }
    }

}

function barkEvent(player, npc) {

}