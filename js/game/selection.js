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
        

        this.play = this.add.sprite(280,204,'play');
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(function(){
            this.game.state.start("game");
        }, this);

        this.settings = this.add.sprite(280,316,'settings');
        this.facebook = this.add.sprite(628,22,'facebook');
        this.mute = this.add.sprite(708,22,'mute')
        this.volume = this.add.sprite(708,22,'volume')
        // TODO: Remove this once game is ready;
        //this.game.state.start('game')
    }
};