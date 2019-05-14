class levelOneScene extends Phaser.Scene {

    constructor() {
        super({
            key: "LEVELONE"
        });
        this.player = null;
        this.dogIndex = 0;
        this.xVel = VELOCITY;
        this.yVel = VELOCITY;
        this.lastKey = 3;
        this.npcs = [];
        this.attacked = false;
        this.picked = false;
        this.barked = false;
        this.hasItem = false;
    }

    create() {

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
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Sprite Animations

        var menuScene = this.scene.get("MENU");
        for (var i = 0; i < menuScene.allDogs.length; i++) {
            this.createAnimations(i);
        }

        // Player Sprite

        this.dogIndex = menuScene.dogIndex;
        this.player = this.physics.add.sprite(320, 320, 'dogs');
        // this.physics.add.collider(this.player, this.impassable);
        this.physics.add.collider(this.player, collisionLayer);
        this.player.body.setCollideWorldBounds(true);
        // this.player.body.setCircle(50, this.player.displayWidth / 2 - 50, this.player.displayHeight / 2 - 55);
        this.player.setSize(80, 70);

        // NPC Sprites

        this.npcs.length = 0;

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
            
        }

        // Camera

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2);

    }

    update() {

        if (this.input.keyboard.addKey('ESC').isDown) {
            this.scene.start("MENU");
        }

        // Move sprites

        this.updatePlayerMovement();

        // Update animations

        this.updatePlayerFrames();

        // Player Actions

        this.updatePlayerActions();

    }

    createAnimations(dogIndex) {
        var startingFrame = dogIndex * 8;
        this.anims.create({
            key: dogIndex + 'moveDownIdle',
            frames: [ { key: 'dogs', frame: startingFrame } ],
            frameRate: 1
        });
        this.anims.create({
            key: dogIndex + 'moveDown',
            frames: this.anims.generateFrameNumbers('dogs', { start: startingFrame, end: startingFrame + 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: dogIndex + 'moveRightIdle',
            frames: [ { key: 'dogs', frame: startingFrame + 2 } ],
            frameRate: 1
        });
        this.anims.create({
            key: dogIndex + 'moveRight',
            frames: this.anims.generateFrameNumbers('dogs', { start: startingFrame + 2, end: startingFrame + 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: dogIndex + 'moveLeftIdle',
            frames: [ { key: 'dogs', frame: startingFrame + 4 } ],
            frameRate: 1
        });
        this.anims.create({
            key: dogIndex + 'moveLeft',
            frames: this.anims.generateFrameNumbers('dogs', { start: startingFrame + 4, end: startingFrame + 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: dogIndex + 'moveUpIdle',
            frames: [ { key: 'dogs', frame: startingFrame + 6 } ],
            frameRate: 1
        });
        this.anims.create({
            key: dogIndex + 'moveUp',
            frames: this.anims.generateFrameNumbers('dogs', { start: startingFrame + 6, end: startingFrame + 7 }),
            frameRate: 5,
            repeat: -1
        });
    }
    
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

    updatePlayerFrames() {
        var dogIndex = this.dogIndex;
        if (this.input.keyboard.addKey('A').isDown) {
            this.player.anims.play(dogIndex + 'moveLeft', true);
            this.lastKey = 0;
        }
        else if (this.input.keyboard.addKey('D').isDown) {
            this.player.anims.play(dogIndex + 'moveRight', true);
            this.lastKey = 1;
        }
        else if (this.input.keyboard.addKey('W').isDown) {
            this.player.anims.play(dogIndex + 'moveUp', true);
            this.lastKey = 2;
        }
        else if (this.input.keyboard.addKey('S').isDown) {
            this.player.anims.play(dogIndex + 'moveDown', true);
            this.lastKey = 3;
        }
        else if (this.lastKey == 0) {
            this.player.anims.play(dogIndex + "moveLeftIdle");
        }
        else if (this.lastKey == 1) {
            this.player.anims.play(dogIndex + "moveRightIdle");
        }
        else if (this.lastKey == 2) {
            this.player.anims.play(dogIndex + "moveUpIdle");
        }
        else {
            this.player.anims.play(dogIndex + "moveDownIdle");
        }
    }

    updatePlayerActions() {
        if (this.input.keyboard.addKey('J').isDown) {
            if (!this.attacked) {
                console.log("ATTACK");
                this.attacked = true;
            }
        }
        else {
            this.attacked = false;
        }
        if (this.input.keyboard.addKey('K').isDown) {
            if (!this.picked) {
                if (this.hasItem) {
                    console.log("DROPPED ITEM");
                    this.hasItem = false;
                }
                else {
                    console.log("PICKED UP ITEM");
                    this.hasItem = true;
                }
                this.picked = true;
            }
        }
        else {
            this.picked = false;
        }
        if (this.input.keyboard.addKey('L').isDown) {
            if (!this.barked) {
                console.log("BARK");
                this.barked = true;
            }
        }
        else {
            this.barked = false;
        }
    }
}