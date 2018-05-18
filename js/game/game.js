var Copter = Copter || {};
Copter.Game = function () {};
Copter.Game.prototype = {
    velocity:5,
    gravity:200,
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
            console.log('game over');
        }, this);

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
    }
};