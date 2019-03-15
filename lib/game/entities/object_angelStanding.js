

ig.module(
        'game.entities.object_angelStanding'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityObject_angelStanding = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/angels.png', 90, 90 ),
            size: {x: 90, y:30},
            offset: {x:0, y:-45},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NONE,



            init: function( x, y, settings ) {
                this.parent(x, y, settings);

                // Add the animations
                this.addAnim( 'idle', .5, [4] )
                this.addAnim( 'rip', .5, [0] );

                this.currentAnim = this.anims.idle;



            },


            update: function () {
                this.parent();


                if ( ig.game.playerHasNoPowers == false)
                {

                    this.currentAnim = this.anims.rip;

                }

                /*
                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if ( (this.distanceTo(player) < 60) && (  ig.game.playerHasNoPowers  == true ))
                {

                    ig.log("set");

                    ig.game.playerHasNoPowers = false;
                }
                */


            }




        });
    });





