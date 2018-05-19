var Copter = Copter || {};
Copter.Game = function () {};
Copter.Game.prototype = {
    velocity:5,
    gravity:250,
    enemyRate: 1.5,
    timerCheck:0,
    score:0,
    preload: function () {},
    create: function () {
        
        this.game.physics.setBoundsToWorld();
        this.score = 0;

        //Add scrolling background image tile.
        this.backgroundTile = this.add.tileSprite(0,0,800,600, 'background');      
        this.backgroundTile.tileScale.setTo(0.6)

        //Add Player
        this.player = this.add.sprite(100, this.game.world.centerY, 'player');
        // this.player.scale.setTo(0.25)
        this.player.anchor.setTo(0.5);


        //Add physics to player
        this.game.physics.arcade.enable(this.player);
        // this.player.body.allowGravity = true;
        // this.player.body.gravity.y = this.gravity;
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(function(){
            this.gameOver();
        }, this);

        this.player.inputEnabled = true;
        this.player.input.enableDrag(true);

        //Add enemies group here
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.createMultiple(20, 'missile');
        this.enemies.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', function(e){
            e.kill();
            this.score++;
            this.updateScore();
        }, this);
        this.enemies.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
        this.enemies.setAll('checkWorldBounds', true);
        
        // add bombs
        this.bombs = this.add.group();
        this.bombs.enableBody = true;
        this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
        this.bombs.createMultiple(20, 'bomb');
        this.bombs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', function(b){
            b.kill();
            this.score++;
            this.updateScore();
        }, this);

        this.bombs.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
        this.bombs.setAll('checkWorldBounds', true);

        //Add Score section here
        this.scoreText = this.add.text(this.game.world.width - 100, 10, 'Score: 0', {
            font: '24px Roboto',
            fill: '#000',
            fontWeight:'bold'
        });


        //Add collision listeners

        // Add keyboard handling and swipe handling

        this.cursors = this.game.input.keyboard.createCursorKeys();
        // this.swipe = new Swipe(this.game);

        // this.game.input.onDown.add(function(){
        //     this.game.physics.arcade.moveToPointer(this.player, 1);
        // }, this);

        //Add game-pad
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
        this.joyStick = this.gamepad.addJoystick(600,450,2,'gamepad');
        this.button = this.gamepad.addButton(400,420,1.2,'gamepad');
        this.button.visible= false;
        
    },
    update: function(){
        this.backgroundTile.tilePosition.x -= this.velocity;

        this.game.physics.arcade.overlap(this.player, this.enemies, function(){
            this.gameOver();
        }, null, this);

        this.game.physics.arcade.overlap(this.player, this.bombs, function(){
            this.gameOver();
        }, null, this);

        // var direction = this.swipe.check();
        // if(direction !== null){
        //     switch(direction.direction){
        //         case this.swipe.DIRECTION_LEFT: // do something
        //             this.player.body.velocity.x = this.gravity * (-1);

        //         break;
        //         case this.swipe.DIRECTION_RIGHT:
        //             this.player.body.velocity.x = this.gravity * (1);
        //         break;
        //         case this.swipe.DIRECTION_UP:
        //             this.player.body.velocity.y = this.gravity * (-1);
        //         break;
        //         case this.swipe.DIRECTION_DOWN:
        //             this.player.body.velocity.y = this.gravity * (1);
        //         break;
        //         default:
        //         this.player.body.velocity.x = 0;
        //         this.player.body.velocity.y = 0;
        //         break;
        //     }
            
        // }

        var upDown = Math.abs(this.joyStick.properties.y) > Math.abs(this.joyStick.properties.x);
        
        if(this.cursors.up.isDown || this.joyStick.properties.y < 0 && upDown) {
            this.player.body.velocity.y = this.gravity * (-1);
        }
        else if(this.cursors.down.isDown || this.joyStick.properties.y > 0 && upDown){
            this.player.body.velocity.y = this.gravity * (1);
        }
        else{
            this.player.body.velocity.y = 0;
        }

        if(this.cursors.right.isDown || this.joyStick.properties.x > 0 && !upDown){
            this.player.body.velocity.x = this.gravity * (1);
        }
        else if(this.cursors.left.isDown || this.joyStick.properties.x < 0 && !upDown){
            this.player.body.velocity.x = this.gravity * (-1);
        }
        else{
            this.player.body.velocity.x = 0;
        }

        if(this.timerCheck < this.game.time.now){
            var enemy = this.enemies.getFirstExists(false);
            
            if(enemy){
                enemy.reset(799,this.game.world.height * Math.random());
                enemy.body.velocity.x -= 100 + (100) * Math.random();
            }

            var bomb = this.bombs.getFirstExists(false);
            if(bomb){
                bomb.reset(100 + this.game.world.width * Math.random(),1 );
                bomb.body.velocity.y += 100 + 100 * Math.random();
            }

            this.timerCheck = this.game.time.now + (2000 / this.enemyRate);
        }
        
    },
    gameOver: function(){
        this.game.state.start('game-over');
    },
    updateScore: function(){
        this.scoreText.setText('Score: '+ this.score);
    }
};