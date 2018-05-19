/**
 * Preload the assets for game. 
 * 1. Player
 * 2. Enemies
 * 3. Background
 * 4. UI-Elements
 */

var Copter = Copter || {};
Copter.Preload = function () {};
Copter.Preload.prototype = {
    preload: function () {
        // this.game.stage.backgroundColor = '#00FF00';

        // Background
        this.background = this.add.sprite(0, 0, 'background');
        this.background.scale.setTo(0.6);

        //Game logo
        this.gameLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 60, 'logo');
        this.gameLogo.anchor.setTo(0.5);
        this.gameLogo.scale.setTo(0.25);

        // Loading bar
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(0.5);

        //Loading text
        this.loadingText = this.add.text(this.game.world.centerX, this.game.world.centerY + 30, '', {
            font: "18px Roboto",
            fill: "#000"
        });
        this.loadingText.anchor.setTo(0.5);
    },
    create: function () {
        // Add loading events
        this.game.load.onLoadStart.add(this.startLoadingAssets, this);
        this.game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadingText.setText('Loading ' + progress);
        }, this);
        this.game.load.onLoadComplete.add(this.loadingFinished, this);

        this.startLoadingAssets();
    },
    startLoadingAssets: function () {
        //Background
        this.load.image('player', 'assets/plane/player.png');
        this.load.image('missile', 'assets/bullets/missile.png');
        this.load.image('bomb', 'assets/bullets/bombs.png')

        this.game.load.start();
        this.loadingText.setText('Loading...');

    },
    loadingFinished: function () {
        this.game.state.start('selection');
    }
};