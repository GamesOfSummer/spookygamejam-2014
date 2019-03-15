

ig.module(
    'game.entities.urzaBoss'
)
    .requires(
    'impact.entity'
)
    .defines(function(){
        EntityUrzaBoss = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/urza.png', 300, 300 ),
            size: {x: 300, y:300},

            gravityFactor: 0,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NONE,

            warpTo : null,

            zIndex : -10,

            health : 100,

            init: function( x, y, settings ) {
                this.parent(x, y, settings);


                this.warpTo = settings.warpTo;

                this.addAnim( 'shutEye',.05, [0] );
                this.addAnim( 'openEye',.05, [1] );

                this.currentAnim = this.anims.openEye;

            },


            update: function() {


            }





        });
    });


