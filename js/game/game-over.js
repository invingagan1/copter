var Copter = Copter || {};
Copter.GameOver = function(){}
Copter.GameOver.prototype = {
    preload: function(){},
    create: function(){
        //Add game background
        this.background = this.add.sprite(0,0,'background');
        this.background.scale.setTo(0.6);

        //Game Over Text
        this.title = this.add.text(this.game.world.centerX, this.game.world.centerY - 50,'Game over', {
            font: '48px Roboto',
            fill:'#000',
            fontWeight:'bold'
        });
        this.title.anchor.setTo(0.5);


        //Add Score

        //Add replay button
        this.replayText = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Replay', {
            font: '24px Roboto',
            fill:'#F00'
        });
        this.replayText.anchor.setTo(0.5);
        this.replayText.inputEnabled = true;
        this.replayText.events.onInputDown.add(function(){
            console.log('replay clicked');
            this.game.state.start('game')
        }, this);

    },
    update: function(){
    }
}