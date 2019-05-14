class levelOneScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LEVELONE"
        });
        this.player = null;
        this.healthBox = null;
        this.healthBar = null;
        this.npcs = [];
        this.collisionLayer = null;
        this.items = [];
        this.quests = [];
        this.questsCompleted = 0;
        this.currentReputation = null;
        this.seconds = 0;
        this.timerText = "";
        this.timer = null;
    }

    create() {

<<<<<<< HEAD
        // Tilemap
        var map = this.make.tilemap({ key: 'benchmark2Map' });
        var sidewalkTile = map.addTilesetImage("sidewalk", 'sidewalk');
        var streetHoriztonalTile = map.addTilesetImage("street_horiz", 'streetHorizontal');
        var streetIntersectionTile = map.addTilesetImage("street_intersection", 'streetIntersection');
        var streetVerticalTile = map.addTilesetImage("street_vertical", 'streetVertical');
        var buildingTile = map.addTilesetImage("building", 'building');
        var tileset = [sidewalkTile, streetHoriztonalTile, streetIntersectionTile, streetVerticalTile];
        var backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0).setDepth(-1);
        var collisionLayer = map.createStaticLayer("Collision", buildingTile, 0, 0);
        // this.impassable = [];
        // for(var i = 0; i < map.layers[1].data.length; i++) {
        //     for (var j = 0; j < map.layers[1].data[0].length; j++) {
        //         if (map.layers[1].data[i][j].index != -1) {
        //             console.log(map.layers[1].data[i][j]);
        //             var wall = this.physics.add.sprite(j * 128 + 16, i * 128 + 16);
        //             wall.setOrigin(-1, -1);
        //             wall.setSize(128, 128);
        //             wall.body.immovable = true;
        //             this.impassable.push(wall);
        //         }
        //     }
        // }

        // Collisions
        collisionLayer.setCollisionByProperty({collides:true});
        collisionLayer.setCollisionBetween(4, 8);
=======
        // Reset Level

        this.npcs.length = 0;
        this.items.length = 0;
        this.quests.length = 0;

        // Set progress

        progress.NEW = false;
        progress.CURRENTLEVEL = "LEVELONE" 
        progress.CURRENTLEVELINDEX = 0;

        // Set variables (SAME FOR EVERY LEVEL)

        PLAYERHEALTH = 500;
        HUMANDAMAGE = BASEHUMANDAMAGE + Math.ceil(progress.REPUTATION * 0.4);
        DOGDAMAGE = BASEDOGDAMAGE + Math.ceil(progress.REPUTATION * 0.4);
        ENEMYATTACKSPEED = BASEATTACKSPEED + Math.ceil(progress.REPUTATION * 0.01);
        ENEMYATTACKFRAMERATE = (ANIMATION_FRAME_RATE + 10) * ENEMYATTACKSPEED;

        // Overlay (THE SAME FOR EVERY LEVEL)

        createLevelOverlay(this);

        // Tilemap (THE SAME FOR EVERY LEVEL EXCEPT FOR MAP KEY)
        
        var map = this.make.tilemap({ key: 'levelOneMap' });
        var tileset = map.addTilesetImage("citytileset", 'cityTiles');
        map.createStaticLayer("Background", tileset, 0, 0).setDepth(DEPTH.BACKGROUND);
        this.collisionLayer = map.createStaticLayer("Collision", tileset, 0, 0).setDepth(DEPTH.COLLISION);

        // Objects (THE SAME FOR EVERY LEVEL)

        // Remove a line if that particular item does not exist in this map
        var bananas = map.createFromObjects('Items', 11, {key: 'items', frame: 0});
        var cigarettes = map.createFromObjects('Items', 12, {key: 'items', frame: 1});
        var gumwrappers = map.createFromObjects('Items', 13, {key: 'items', frame: 2});
        var bottles = map.createFromObjects('Items', 14, {key: 'items', frame: 3});
        var cans = map.createFromObjects('Items', 15, {key: 'items', frame: 4});
        var pistachios = map.createFromObjects('Dogs', 178, {key: 'pistachio'});
        var spots = map.createFromObjects('Dogs', 256, {key: 'spot'});
        var bears = map.createFromObjects('Dogs', 334, {key: 'bear'});
        var goodNPCs = map.createFromObjects('Goods', 16, {key: 'goodguy'});
        var badNPCs = map.createFromObjects('Bads', 97, {key: 'badguy'});
        this.totalBadNPCs = badNPCs.length;
        this.badNPCsLength = badNPCs.length;

        // Collisions (THE SAME FOR EVERY LEVEL)

        this.collisionLayer.setCollisionByProperty({collides:true});
>>>>>>> 27404a5360f74c1d008e15ca7aba351363eefc8a
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Sprite Animations (THE SAME FOR EVERY LEVEL)

        var menuScene = this.scene.get("MENU");
        for (var i = 0; i < menuScene.allDogs.length; i++) {
            createDogAnimations(i, this);
        }
        createGoodGuyAnimations(this);
        createBadGuyAnimations(this);

        // Player Sprite (THE SAME FOR EVERY LEVEL EXCEPT FOR SPAWN LOCATION)

<<<<<<< HEAD
        this.dogIndex = menuScene.dogIndex;
        this.player = this.physics.add.sprite(320, 320, 'dogs');
        // this.physics.add.collider(this.player, this.impassable);
        this.physics.add.collider(this.player, collisionLayer);
        this.player.body.setCollideWorldBounds(true);
        // this.player.body.setCircle(50, this.player.displayWidth / 2 - 50, this.player.displayHeight / 2 - 55);
        this.player.setSize(80, 70);
=======
        var spawnX = 320;
        var spawnY = 320;
        createPlayer(this, spawnX, spawnY);
>>>>>>> 27404a5360f74c1d008e15ca7aba351363eefc8a

        //var playerContainer = this.add.container(0, 0, [this.player, healthBox, loadingBar]);

        // Dog NPC Sprites (THE SAME FOR EVERY LEVEL)

<<<<<<< HEAD
        for (var i = 0; i < 20; i++) {
            var randomDogIndex = Math.floor((Math.random() * 3));
            var xPos = Math.floor((Math.random() * map.widthInPixels));
            while (xPos < 64 || xPos > map.widthInPixels - 64) {
                xPos = Math.floor((Math.random() * map.widthInPixels));
            }
            var yPos = Math.floor((Math.random() * map.heightInPixels));
            while (yPos < 64 || yPos > map.heightInPixels - 64) {
                yPos = Math.floor((Math.random() * map.heightInPixels));
            }
            var npc = this.physics.add.sprite(xPos, yPos, 'dogs');
            npc.anims.play(randomDogIndex + 'moveDown', true);
            this.physics.add.collider(npc, this.player);
            this.physics.add.collider(npc, collisionLayer);
            npc.body.setCollideWorldBounds(true);
            npc.setImmovable();
            npc.setSize(40, 70);
            // npc.body.setCircle(50, this.player.displayWidth / 2 - 50, this.player.displayHeight / 2 - 55);
            if (this.physics.collide(npc, this.npcs)) {
                console.log("COLLIDED WITH ANOTHER SPRITE");
            }
            else if (this.physics.collide(npc, this.player)) {
                console.log("COLLIDED WITH PLAYER");
            }
            else if (this.physics.overlap(npc, buildingTile)) {
                console.log("COLLIDED WITH BUILDING");
            }
            this.npcs.push(npc);
            
=======
        // Remove a loop if that particular sprite type does not exist in this map
        for (var i = 0; i < pistachios.length; i++) {
            var npc = createNPC(pistachios[i], this, 300);
            pistachios[i].destroy();
            npc.body.setSize(112, 80);
        }
        for (var i = 0; i < spots.length; i++) {
            var npc = createNPC(spots[i], this, 300);
            spots[i].destroy();
            npc.body.setSize(112, 80);
        }
        for (var i = 0; i < bears.length; i++) {
            var npc = createNPC(bears[i], this, 300);
            bears[i].destroy();
            npc.body.setSize(112, 80);
>>>>>>> 27404a5360f74c1d008e15ca7aba351363eefc8a
        }

        // Human NPC Sprites (THE SAME FOR EVERY LEVEL)

        // Remove a loop if that particular sprite type does not exist in this map
        for (var i = 0; i < goodNPCs.length; i++) {
            var npc = createNPC(goodNPCs[i], this, 500);
            goodNPCs[i].destroy();
            npc.body.setSize(48, 112);
        }
        for (var i = 0; i < badNPCs.length; i++) {
            var npc = createNPC(badNPCs[i], this, 500);
            badNPCs[i].destroy();
            npc.body.setSize(48, 112);
        }

        // Item Sprites (THE SAME FOR EVERY LEVEL)

        // Remove a line if that particular item does not exist in this map
        this.items = this.items.concat(bananas)
        this.items = this.items.concat(cigarettes)
        this.items = this.items.concat(gumwrappers)
        this.items = this.items.concat(bottles)
        this.items = this.items.concat(cans)
        this.totalItems = this.items.length;

        // Camera (THE SAME FOR EVERY LEVEL)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2);

        // Timer (THE SAME FOR EVERY LEVEL)
    
        // Timer decreases when reputation is higher, and the opposite when lower
        this.seconds = 300 - Math.ceil(progress.REPUTATION * 1.2);
        this.timer = this.time.delayedCall(this.seconds * 1000, loseLevel, [this], this);

        // Quests (LINE BELOW IS THE SAME FOR EVERY LEVEL)

        this.createQuests();
        
    }

    update() {

        // ALL METHODS THE SAME FOR EVERY LEVEL

        // Listen for pause event (if player pauses)

        pauseEvent(this);

        // Update player animations

        updatePlayerFrames(this.player, this);

        // Move player

        updatePlayerMovement(this.player, this);

        // Listen for player actions

        updatePlayerActions(this.player, this);

        // Update player health

        updatePlayerHealth(this, this.healthBox, this.healthBar, this.player);

        // Move NPCS and listen for NPC actions

        for (var i = 0; i < this.npcs.length; i++) {
            var npcFile = this.npcs[i];
            var npc = npcFile.npc;
            var health = npcFile.health;
            var maxHealth = npcFile.maxHealth;
            var healthBox = npcFile.healthBox;
            var healthBar = npcFile.healthBar;
            if (health <= 0) {
                this.npcs.splice(i, 1);
                processNPCDeath(npcFile, this);
            }
            updateNPCMovement(this, npc, npcFile);
            updateEnemyActions(this, npcFile);
            updateEnemyHealth(npc, health, maxHealth, healthBox, healthBar);
        }

        // Update player reputation

        updateReputation(this);

        // Update Quests

        this.updateQuest();

        // Update Timer

        updateTimer(this);

    }

    /******************************************** DIFFERENT FOR EACH LEVEL ********************************************/

    createQuests() {

        var questOne = this.add.text(QUESTX + 20, QUESTY + 20, "• Collect all trash (0/50 collected)", {
            fontFamily: FONT,
            fontSize: '28px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questOne.setScrollFactor(0);
        questOne.setStroke('black', 3);
        questOne.setWordWrapWidth(WORDWRAPWIDTH);
        this.quests.push({
            questText: questOne,
            questStatus: "INCOMPLETE"
        });

        var questTwo = this.add.text(QUESTX + 20, QUESTY + 100, "• Get rid of the\nbad guys\n(0/5 gone)", {
            fontFamily: FONT,
            fontSize: '28px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questTwo.setScrollFactor(0);
        questTwo.setStroke('black', 3);
        questTwo.setWordWrapWidth(WORDWRAPWIDTH);
        this.quests.push({
            questText: questTwo,
            questStatus: "INCOMPLETE"
        });

    }
<<<<<<< HEAD
    
    updatePlayerMovement() {
        this.xVel = 0;
        this.yVel = 0;
    
        if (this.input.keyboard.addKey('A').isDown) {
            this.xVel -= 1;
        }
        if (this.input.keyboard.addKey('D').isDown) {
            this.xVel += 1;
        }
        if (this.input.keyboard.addKey('W').isDown) {
            this.yVel -= 1;
        }
        if (this.input.keyboard.addKey('S').isDown) {
            this.yVel += 1;
        }

        var normalise = Math.sqrt(this.yVel * this.yVel + this.xVel * this.xVel);
        if(normalise != 0) {
            if (this.input.keyboard.addKey('SHIFT').isDown) {
                this.player.body.setVelocityX(this.xVel / normalise * 1.9 * VELOCITY);
                this.player.body.setVelocityY(this.yVel / normalise * 1.9 * VELOCITY);
            } else {
                this.player.body.setVelocityX(this.xVel / normalise * VELOCITY);
                this.player.body.setVelocityY(this.yVel / normalise * VELOCITY);
            }
        } else {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        }
    }
=======

    updateQuest() {

        if (this.quests.length == this.questsCompleted) {
            winLevel(this);
        }
>>>>>>> 27404a5360f74c1d008e15ca7aba351363eefc8a

        for (var i = 0; i < this.quests.length; i++) {

            var questText = this.quests[i].questText;
            var questStatus = this.quests[i].questStatus;

            if (i == 0) {
                var itemsCollected = this.totalItems - this.items.length;
                questText.setText("• Collect all trash (" + itemsCollected + "/" + this.totalItems + " collected)");
                if (itemsCollected == this.totalItems) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(20);
                        break;
                    }
                    
                }
            }

            else if (i == 1) {
                var badGuysGone = this.totalBadNPCs - (this.badNPCsLength);
                questText.setText("• Get rid of the bad guys (" + badGuysGone + "/5 gone)");
                if (badGuysGone == this.totalBadNPCs) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(20);
                        break;
                    }
                }
            }

        }

    }
}