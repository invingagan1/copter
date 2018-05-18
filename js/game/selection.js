var Copter = Copter || {};
Copter.Selection = function () {};
Copter.Selection.prototype = {
    preload: function () {},
    create: function () {
        // Create background
        this.background = this.add.sprite(0, 0, 'background');
        this.background.scale.setTo(0.6);

        /**
         * Create button
         * 1. Play
         * 2. Settings
         * 3. mute
         * 4. board
         */
        this.playText = this.add.text(this.game.world.centerX, this.game.world.centerY,"Play" ,{
            font: "24px Roboto",
            fill: "#F00"
        });
        this.playText.anchor.setTo(0.5);
        this.playText.inputEnabled = true;
        this.playText.events.onInputDown.add( function(){
            this.game.state.start("game");
        }, this);
        // TODO: Remove this once game is ready;
        this.game.state.start('game')
    }
};