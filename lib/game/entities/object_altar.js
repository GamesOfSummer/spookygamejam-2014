

ig.module(
        'game.entities.object_altar'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityObject_altar = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/player.png', 60, 60 ),
            size: {x: 30, y:45},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NONE,



            init: function( x, y, settings ) {
                this.parent(x, y, settings);

                // Add the animations
                this.addAnim( 'idle', .5, [0,1] );

            },


            update: function () {
                this.parent();


                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if ( (this.distanceTo(player) < 60) && (  ig.game.playerHasNoPowers  == true ))
                {

                    ig.log("set");

                    ig.game.playerHasNoPowers = false;
                }


            }




        });
    });





