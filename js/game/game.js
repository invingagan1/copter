var Copter = Copter || {};
Copter.Game = function () {};
Copter.Game.prototype = {
    velocity:5,
    gravity:200,
    enemyRate: 5,
    timerCheck:0,
    score:0,
    preload: function () {},
    create: function () {
        
        this.game.physics.setBoundsToWorld();

        //Add scrolling background image tile.
        this.backgroundTile = this.add.tileSprite(0,0,800,600, 'background');      
        this.backgroundTile.tileScale.setTo(0.6)

        //Add Player
        this.player = this.add.sprite(100, this.game.world.centerY, 'logo');
        this.player.scale.setTo(0.25)
        this.player.anchor.setTo(0.5);


        //Add physics to player
        this.game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = true;
        this.player.body.gravity.y = this.gravity;
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(function(){
            this.gameOver();
        }, this);

        //Add enemies group here
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.createMultiple(20, 'enemy');
        this.enemies.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', function(e){
            console.log('reset enemy');
            e.kill();
            this.score++;
            this.updateScore();
        }, this);
        this.enemies.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
        this.enemies.setAll('checkWorldBounds', true);
        // this.timerCheck = this.game.time.now + (1000 / this.enemyRate);

        //Add Score section here
        this.scoreText = this.add.text(this.game.world.width - 100, 10, 'Score: 0', {
            font: '24px Roboto',
            fill: '#000',
            fontWeight:'bold'
        });


        //Add collision listeners
        

        // Add keyboard handling
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },
    update: function(){
        this.backgroundTile.tilePosition.x -= this.velocity;
        if(this.cursors.up.isDown || this.game.input.activePointer.isDown){
            this.player.body.velocity.y = this.gravity * (-1);
        }else{
            this.player.body.velocity.y = this.gravity;
        }
        if(this.timerCheck < this.game.time.now){
            var enemy = this.enemies.getFirstExists(false);
            
            if(enemy){
                enemy.reset(799,this.game.world.height * Math.random());
                enemy.body.velocity.x -= 250 + (500) * Math.random();
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