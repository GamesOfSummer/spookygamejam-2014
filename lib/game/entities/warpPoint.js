

ig.module(
    'game.entities.warpPoint'
)
    .requires(
    'impact.entity'
)
    .defines(function(){
        EntityWarpPoint = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/player.png', 60, 60 ),
            size: {x: 30, y:45},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.ACTIVE,

            warpTo : null,

            init: function( x, y, settings ) {
                this.parent(x, y, settings);


                this.warpTo = settings.warpTo;

            },


            update: function() {
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                if ((this.distanceTo(player) < 90 )) {

                    ig.log("** Warp Point Entity Debug Message :: " + this.warpTo + " :: -- ");
                    //ig.game.loadLevel(  ig.global[ this.warpTo] ) ;

                    ig.game.globalLevel = ig.global[ this.warpTo ];
                    ig.game.loadLevelDeferred( ig.global[ this.warpTo ] );
                }

            }





        });
    });


