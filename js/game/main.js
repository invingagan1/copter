var Copter = Copter || {};

window.onload = function(){

    var height = window.innerHeight;
    var width = window.innerWidth;
    var ratio = Math.ceil(width/height);
    Copter.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    /**
     * Add Game states here.
        1. Boot: Boot of the game. it will load the preload bar and game icon. 
        2. Preload: It will load the assets used in game. Audio/images/Sprites/tile maps. It will show the progress bar if loading of assets.
        3. Selection: It will have selection options of game.
        4. Game: It will have game logic
     */
    
    Copter.game.state.add('boot', Copter.Boot);
    Copter.game.state.add('preload', Copter.Preload);
    Copter.game.state.add('selection', Copter.Selection);
    Copter.game.state.add('game', Copter.Game);
    Copter.game.state.add('game-over', Copter.GameOver);
    
    Copter.game.state.start('boot');
}
