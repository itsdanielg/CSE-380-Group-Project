class levelTwoScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LEVELTWO"
        });
        this.player = null;
        this.healthBox = null;
        this.healthBar = null;
        this.npcs = [];
        this.collisionLayer = null;
        this.items = [];
        this.quests = [];
        this.currentReputation = null;
        this.seconds = 0;
        this.timerText = "";
        this.timer = null;
    }

    create() {

        // Reset Level

        this.npcs.length = 0;
        this.items.length = 0;
        this.quests.length = 0;

        // Set progress

        progress.NEW = false;
        progress.CURRENTLEVEL = "LEVELTWO" 
        progress.CURRENTLEVELINDEX = 0;
        PLAYERHEALTH = 500;

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
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Sprite Animations (THE SAME FOR EVERY LEVEL)

        var menuScene = this.scene.get("MENU");
        for (var i = 0; i < menuScene.allDogs.length; i++) {
            createAnimations(i, this);
        }
        createGoodGuyAnimations(this);
        createBadGuyAnimations(this);

        // Player Sprite (THE SAME FOR EVERY LEVEL EXCEPT FOR SPAWN LOCATION)

        var spawnX = 320;
        var spawnY = 320;
        createPlayer(this, spawnX, spawnY);

        //var playerContainer = this.add.container(0, 0, [this.player, healthBox, loadingBar]);

        // Dog NPC Sprites (THE SAME FOR EVERY LEVEL)

        // Remove a loop if that particular sprite type does not exist in this map
        for (var i = 0; i < pistachios.length; i++) {
            var npc = createNPC(pistachios[i], this, 300);
            pistachios[i].destroy();
            npc.body.setSize(80, 70);
        }
        for (var i = 0; i < spots.length; i++) {
            var npc = createNPC(spots[i], this, 300);
            spots[i].destroy();
            npc.body.setSize(80, 70);
        }
        for (var i = 0; i < bears.length; i++) {
            var npc = createNPC(bears[i], this, 300);
            bears[i].destroy();
            npc.body.setSize(80, 70);
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
        this.cameras.main.startFollow(this.player);

        // Sounds (THE SAME FOR EVERY LEVEL)

        createSounds(this);

        // Timer (THE SAME FOR EVERY LEVEL)
    
        // Timer decreases when reputation is higher, and the opposite when lower
        this.seconds = 300 - Math.ceil(progress.REPUTATION * 1.2);
        this.timer = this.time.delayedCall(this.seconds * 1000, loseLevel, [this], this);

        // Quests (LINE BELOW IS THE SAME FOR EVERY LEVEL)

        this.createQuests();
        
    }

    update() {

        // ALL METHODS THE SAME FOR EVERY LEVEL

        // Listen for pause event

        pauseEvent(this);

        // Update player animations

        updatePlayerFrames(this.player, this);

        // Move player

        updatePlayerMovement(this.player, this);

        // Listen for player actions

        updatePlayerActions(this.player, this);

        // Update player health

        updatePlayerHealth(this.healthBox, this.healthBar, this.player);

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
            updateNPCMovement(this, npc);
            updateEnemyActions(this, npc);
            updateEnemyHealth(npc, health, maxHealth, healthBox, healthBar);
        }

        // Update player reputation

        updateReputation(this);

        // Update Quests

        this.updateQuest();

        // Update Timer

        updateTimer(this);

        // Update Volume
        
        this.sound.setVolume(SOUNDVOLUME);

    }

    /******************************************** DIFFERENT FOR EACH LEVEL ********************************************/

    createQuests() {

        var questOne = this.add.text(QUESTX + 130, QUESTY + 50, "• Collect all trash\n(0/50 collected)", {
            fontFamily: 'Georgia',
            fontSize: '28px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questOne.setScrollFactor(0);
        questOne.setStroke('black', 3);
        questOne.setOrigin(0.5);
        this.quests.push(questOne);

        var questTwo = this.add.text(QUESTX + 130, QUESTY + 150, "• Get rid of the\nbad guys\n(0/5 gone)", {
            fontFamily: 'Georgia',
            fontSize: '28px',
            fill: '#ffffff'
        }).setDepth(DEPTH.OVERLAYTEXT);
        questTwo.setScrollFactor(0);
        questTwo.setStroke('black', 3);
        questTwo.setOrigin(0.5);
        this.quests.push(questTwo);

    }

    updateQuest() {

        if (this.quests.length == 0) {
            winLevel(this);
        }

        for (var i = 0; i < this.quests.length; i++) {

            if (i == 0) {
                var itemsCollected = this.totalItems - this.items.length;
                this.quests[i].setText("• Collect all trash\n(" + itemsCollected + "/" + this.totalItems + " collected)");
                if (itemsCollected == this.totalItems) {
                    this.quests[i].setFill("#7CFC00");
                    this.sound.play('questSound');
                    this.quests.splice(i, 1);
                    changeReputation(20);
                    break;
                }
            }

            else if (i == 1) {
                var badGuysGone = this.totalBadNPCs - (this.badNPCsLength);
                this.quests[i].setText("• Get rid of the\nbad guys\n(" + badGuysGone + "/5 gone)");
                if (badGuysGone == this.totalBadNPCs) {
                    this.quests[i].setFill("#7CFC00");
                    this.sound.play('questSound');
                    this.quests.splice(i, 1);
                    changeReputation(20);
                    break;
                }
            }

        }

    }

}