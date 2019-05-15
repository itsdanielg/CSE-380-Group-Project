class levelFiveScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LEVELFIVE"
        });
        this.player = null;
        this.healthBox = null;
        this.healthBar = null;
        this.mapSize = [];
        this.collisionLayer = null;
        this.npcs = [];
        this.items = [];
        this.quests = [];
        this.totalBadGuys = 0;
        this.totalGoodGuys = 0;
        this.totalDogs = 0;
        this.totalItems = 0;
        this.questsCompleted = 0;
        this.currentReputation = null;
        this.seconds = 0;
        this.timerText = "";
        this.timer = null;
    }

    create() {

        // Reset Level

        this.player = null;
        this.healthBox = null;
        this.healthBar = null;
        this.mapSize.length = 0;
        this.collisionLayer = null;
        this.npcs.length = 0;
        this.items.length = 0;
        this.quests.length = 0;
        this.totalBadGuys = 0;
        this.totalGoodGuys = 0;
        this.totalDogs = 0;
        this.totalItems = 0;
        this.questsCompleted = 0;
        this.currentReputation = null;
        this.seconds = 0;
        this.timerText = "";
        this.timer = null;

        // Set progress

        progress.NEW = false;
        progress.CURRENTLEVEL = "LEVELFIVE" 
        progress.CURRENTLEVELINDEX = 4;

        // Set variables (SAME FOR EVERY LEVEL; ACTUAL VALUES CHANGE BASED ON CURRENT REPUTATION)

        PLAYERHEALTH = BASEPLAYERHEALTH;
        HUMANDAMAGE = BASEHUMANDAMAGE + Math.ceil(progress.REPUTATION * 0.4);
        DOGDAMAGE = BASEDOGDAMAGE + Math.ceil(progress.REPUTATION * 0.4);
        ENEMYATTACKSPEED = BASEATTACKSPEED + Math.ceil(progress.REPUTATION * 0.01);
        ENEMYATTACKFRAMERATE = (ANIMATION_FRAME_RATE + 10) * ENEMYATTACKSPEED;
        ITEMSCANCOLLECT = [0]

        // Overlay (THE SAME FOR EVERY LEVEL)

        createLevelOverlay(this);

        // Tilemap (THE SAME FOR EVERY LEVEL EXCEPT FOR MAP KEY)
        
        var map = this.make.tilemap({ key: 'levelFiveMap' });
        var tileset = map.addTilesetImage("citytileset", 'cityTiles');
        var background = map.createStaticLayer("Background", tileset, 0, 0);
        this.collisionLayer = map.createStaticLayer("Collision", tileset, 0, 0);
        this.mapSize = [map.widthInPixels, map.heightInPixels];
        background.setDepth(DEPTH.BACKGROUND);
        this.collisionLayer.setDepth(DEPTH.COLLISION);

        // Objects (THE SAME FOR EVERY LEVEL)

        // Remove a line if that particular item does not exist in this map
        var bananas = map.createFromObjects('Items', 16, {key: 'items', frame: 0});
        var cigarettes = map.createFromObjects('Items', 17, {key: 'items', frame: 1});
        var gumwrappers = map.createFromObjects('Items', 18, {key: 'items', frame: 2});
        var bottles = map.createFromObjects('Items', 19, {key: 'items', frame: 3});
        var cans = map.createFromObjects('Items', 20, {key: 'items', frame: 4});
        var pistachios = map.createFromObjects('Dogs', 183, {key: 'pistachio'});
        var spots = map.createFromObjects('Dogs', 261, {key: 'spot'});
        var bears = map.createFromObjects('Dogs', 339, {key: 'bear'});
        var goodNPCs = map.createFromObjects('Goods', 21, {key: 'goodguy'});
        var badNPCs = map.createFromObjects('Bads', 102, {key: 'badguy'});

        // Collisions (THE SAME FOR EVERY LEVEL)

        this.collisionLayer.setCollisionByProperty({collides:true});
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Sprite Animations (THE SAME FOR EVERY LEVEL)

        resetAnims(this);
        var menuScene = this.scene.get("MENU");
        for (var i = 0; i < menuScene.allDogs.length; i++) {
            createDogAnimations(i, this);
        }
        createGoodGuyAnimations(this);
        createBadGuyAnimations(this);

        // Player Sprite (THE SAME FOR EVERY LEVEL EXCEPT FOR SPAWN LOCATION)

        var spawnX = 320;
        var spawnY = 640;
        createPlayer(this, spawnX, spawnY);

        //var playerContainer = this.add.container(0, 0, [this.player, healthBox, loadingBar]);

        // Dog NPC Sprites (THE SAME FOR EVERY LEVEL)

        // Remove a loop if that particular sprite type does not exist in this map
        for (var i = 0; i < pistachios.length; i++) {
            var npc = createNPC(pistachios[i], this, 300);
            pistachios[i].destroy();
            npc.body.setSize(112, 80);
            this.totalDogs++;
        }
        for (var i = 0; i < spots.length; i++) {
            var npc = createNPC(spots[i], this, 300);
            spots[i].destroy();
            npc.body.setSize(112, 80);
            this.totalDogs++;
        }
        for (var i = 0; i < bears.length; i++) {
            var npc = createNPC(bears[i], this, 300);
            bears[i].destroy();
            npc.body.setSize(112, 80);
            this.totalDogs++;
        }

        // Human NPC Sprites (THE SAME FOR EVERY LEVEL)

        // Remove a loop if that particular sprite type does not exist in this map
        for (var i = 0; i < goodNPCs.length; i++) {
            var npc = createNPC(goodNPCs[i], this, 500);
            goodNPCs[i].destroy();
            npc.body.setSize(48, 112);
            this.totalGoodGuys++;
        }
        for (var i = 0; i < badNPCs.length; i++) {
            var npc = createNPC(badNPCs[i], this, 500);
            badNPCs[i].destroy();
            npc.body.setSize(48, 112);
            this.totalBadGuys++;
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
        this.cameras.main.startFollow(this.player);

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
            processNPCEscape(this, npcFile);
            if (health <= 0) {
                processNPCDeath(npcFile, this);
                this.npcs.splice(i, 1);
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

        var questOne = this.add.text(QUESTX + 20, QUESTY + 20, "• Get rid of all suspicious activity (0/" + this.totalBadGuys + " gone)", {
            fontFamily: FONT,
            fontSize: '24px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questOne.setScrollFactor(0);
        questOne.setStroke('black', 3);
        questOne.setWordWrapWidth(WORDWRAPWIDTH);
        this.quests.push({
            questText: questOne,
            questStatus: "INCOMPLETE"
        });
        
        var totalBananas = getTotalItems(this, 0);
        var questTwo = this.add.text(QUESTX + 20, QUESTY + 120, "• Collect all bananas (" + totalBananas + " remaining)", {
            fontFamily: FONT,
            fontSize: '24px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questTwo.setScrollFactor(0);
        questTwo.setStroke('black', 3);
        questTwo.setWordWrapWidth(WORDWRAPWIDTH);
        this.quests.push({
            questText: questTwo,
            questStatus: "INCOMPLETE"
        });

        var totalCigarettes = getTotalItems(this, 1);
        var questThree = this.add.text(QUESTX + 20, QUESTY + 190, "• Collect all cigarettes (" + totalCigarettes + " remaining)", {
            fontFamily: FONT,
            fontSize: '24px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questThree.setScrollFactor(0);
        questThree.setStroke('black', 3);
        questThree.setWordWrapWidth(WORDWRAPWIDTH);
        questThree.setVisible(false);
        this.quests.push({
            questText: questThree,
            questStatus: "INCOMPLETE"
        });

        var totalGumWrappers = getTotalItems(this, 2);
        var questFour = this.add.text(QUESTX + 20, QUESTY + 260, "• Collect all gum wrappers (" + totalGumWrappers + " remaining)", {
            fontFamily: FONT,
            fontSize: '24px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questFour.setScrollFactor(0);
        questFour.setStroke('black', 3);
        questFour.setWordWrapWidth(WORDWRAPWIDTH);
        questFour.setVisible(false);
        this.quests.push({
            questText: questFour,
            questStatus: "INCOMPLETE"
        });

        var totalBottles = getTotalItems(this, 3);
        var questFive = this.add.text(QUESTX + 20, QUESTY + 330, "• Collect all bottles (" + totalBottles + " remaining)", {
            fontFamily: FONT,
            fontSize: '24px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questFive.setScrollFactor(0);
        questFive.setStroke('black', 3);
        questFive.setWordWrapWidth(WORDWRAPWIDTH);
        questFive.setVisible(false);
        this.quests.push({
            questText: questFive,
            questStatus: "INCOMPLETE"
        });

        var totalCans = getTotalItems(this, 4);
        var questSix = this.add.text(QUESTX + 20, QUESTY + 400, "• Collect all cans (" + totalCans + " remaining)", {
            fontFamily: FONT,
            fontSize: '24px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questSix.setScrollFactor(0);
        questSix.setStroke('black', 3);
        questSix.setWordWrapWidth(WORDWRAPWIDTH);
        questSix.setVisible(false);
        this.quests.push({
            questText: questSix,
            questStatus: "INCOMPLETE"
        });

    }

    updateQuest() {

        if (this.quests.length == this.questsCompleted) {
            winLevel(this);
        }

        for (var i = 0; i < this.quests.length; i++) {

            var questText = this.quests[i].questText;
            var questStatus = this.quests[i].questStatus;

            if (i == 0) {
                var badGuysRemaining = 0;
                for (var j = 0; j < this.npcs.length; j++) {
                    var npc = this.npcs[j].npc;
                    if (npc.texture.key == "badguy") {
                        badGuysRemaining++;
                    }
                }
                var badGuysGone = this.totalBadGuys - badGuysRemaining;
                questText.setText("• Get rid of all suspicious activity (" + badGuysGone + "/" + this.totalBadGuys + " gone)");
                if (badGuysGone == this.totalBadGuys) {
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
                if (ITEMSCANCOLLECT.includes(0)) {
                    questText.setVisible(true);
                }
                var bananasRemaining = getTotalItems(this, 0);
                questText.setText("• Collect all bananas (" + bananasRemaining + " remaining)");
                if (bananasRemaining == 0) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(10);
                        ITEMSCANCOLLECT = [1];
                        break;
                    }
                }
            }

            else if (i == 2) {
                if (ITEMSCANCOLLECT.includes(1)) {
                    questText.setVisible(true);
                }
                var cigarettesRemaining = getTotalItems(this, 1);
                questText.setText("• Collect all cigarettes (" + cigarettesRemaining + " remaining)");
                if (cigarettesRemaining == 0) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(10);
                        ITEMSCANCOLLECT = [2];
                        break;
                    }
                }
            }

            else if (i == 3) {
                if (ITEMSCANCOLLECT.includes(2)) {
                    questText.setVisible(true);
                }
                var gumWrappersRemaining = getTotalItems(this, 2);
                questText.setText("• Collect all gum wrappers (" + gumWrappersRemaining + " remaining)");
                if (gumWrappersRemaining == 0) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(10);
                        ITEMSCANCOLLECT = [3];
                        break;
                    }
                }
            }

            else if (i == 4) {
                if (ITEMSCANCOLLECT.includes(3)) {
                    questText.setVisible(true);
                }
                var bottlesRemaining = getTotalItems(this, 3);
                questText.setText("• Collect all bottles (" + bottlesRemaining + " remaining)");
                if (bottlesRemaining == 0) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(10);
                        ITEMSCANCOLLECT = [4];
                        break;
                    }
                }
            }

            else if (i == 5) {
                if (ITEMSCANCOLLECT.includes(4)) {
                    questText.setVisible(true);
                }
                var cansRemaining = getTotalItems(this, 4);
                questText.setText("• Collect all cans (" + cansRemaining + " remaining)");
                if (cansRemaining == 0) {
                    if (questStatus == "INCOMPLETE") {
                        this.quests[i].questStatus = "COMPLETE";
                        questText.setFill(GOODQUESTFILL);
                        this.sound.play('questSound', {
                            volume: SOUNDVOLUME
                        });
                        this.questsCompleted++;
                        changeReputation(10);
                        break;
                    }
                }
            }

        }

    }

}