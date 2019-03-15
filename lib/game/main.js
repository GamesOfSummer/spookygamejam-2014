ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
   // 'impact.debug.debug',

    'game.background',


    'game.entities.player',
    'game.entities.fireball',
    'game.entities.dino',
    'game.entities.lurker',
    'game.entities.hellHound',
    'game.entities.SPOOK',
    'game.entities.SPOOK2',
    'game.entities.redLines',



    'game.entities.object_angelCorpse',
    'game.entities.object_angelHangingCorpse1',
    'game.entities.object_angelHangingCorpse2',

    'game.entities.object_angelStanding',

    'game.entities.object_angelSitting1',
    'game.entities.object_angelSitting2',

    'game.entities.savePoint',

    'game.entities.hoveringTextBox',
    'game.entities.textBox',
    'game.entities.warpPoint',

    'game.entities.object_altar',


    'game.entities.urzaAltar',
    'game.entities.urzaBoss',



    //'game.levels.title',

    'game.levels.title',
    'game.levels.drop1',
    'game.levels.MAP',
    'game.levels.hallway',
    'game.levels.start'

)
.defines(function(){

MyGame = ig.Game.extend({

    globalLevel : LevelTitle,


    background : new EntityBackground(),


    clearColor: null,
	gravity: 600,

	font: new ig.Font( 'media/04b03.font.png' ),





    //********************************
    // GLOBAL VARIABLES
    // all global variables for the plot
    //********************************


    playerDeathCount : 0,


    playerLayingDown : false,
    playerLayingDownMovementCount : 0,


    playerHasFinishedTutorial : false,


    //playerHasNoPowers : true,
    playerHasNoPowers : false,

    //********************************
    // END OF GLOBAL VARIABLES
    //**************************************




	init: function() 
    {
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );


		ig.input.bind( ig.KEY.SPACE, 'jump' );
        ig.input.bind( ig.KEY.Z, 'fire' );


       // ig.game.globalLevel = LevelMAP;

       // ig.game.globalLevel = LevelDrop1;
      //  ig.game.globalLevel = LevelStart;

        // ig.game.globalLevel = LevelHallway;


        ig.game.globalLevel = LevelTitle;

        this.loadLevel(   ig.game.globalLevel );


        //*******************************************************
        //*******************************************************

        ig.music.add( 'media/music/startMusic.ogg', 'start' );
        ig.music.add( 'media/music/Drop1.ogg', 'FUCK' );
        ig.music.add( 'media/music/hallwayMusic.ogg', 'hallway' );
        ig.music.add( 'media/music/MAPMusic.ogg', 'MAP' );


        ig.music.volume = 0.5;
        ig.music.loop = true;

        //ig.music
        ig.music.play( 'start' );


        //*******************************************************
        //*******************************************************




    },
	
	update: function() {



        //*****************************************
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			}



        /*

        var player = this.getEntitiesByType( EntityPlayer )[0];
        x = player.pos.x - (ig.system.width / 2);
        y = player.pos.y - (ig.system.height / 2);
        this.screen.x = (x > 0 && x < this._mapWidth) ? x : this.screen.x;
        this.screen.y = (y > 0 && y < this._mapHeight) ? y : this.screen.y;
          */

		this.parent();
	
	},
	
	draw: function() {
        ig.system.context.clearRect( 0 ,0, ig.system.realWidth, ig.system.realHeight ); //clear screen command


        // Draw all entities and backgroundMaps
        this.parent();


		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;


    }



});





// Start the Game with 60fps, a resolution of width/height, scaled by X
ig.main( '#canvas', MyGame, 60, 600, 500, 1 );

});
