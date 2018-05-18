/**
 * Load assets for preload screen.
 * 1. Preload bar
 * 2. Game icon 
 */
var Copter = Copter || {};
Copter.Boot = function () {};
Copter.Boot.prototype = {
    preload: function () {
        this.game.load.image('background', 'assets/background/background.png');
        this.game.load.image('logo', 'assets/ui-elements/logo.png');
        this.game.load.image('loading', 'assets/ui-elements/loading.jpg');
    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('preload');
    }
};