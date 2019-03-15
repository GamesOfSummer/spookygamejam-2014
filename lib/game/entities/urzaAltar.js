

ig.module(
    'game.entities.urzaAltar'
)
    .requires(
    'impact.entity'
)
    .defines(function(){
        EntityUrzaAltar = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/urza.png', 300, 300 ),
            size: {x: 300, y:300},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.NONE,

            warpTo : null,

            zIndex : -10,

            init: function( x, y, settings ) {
                this.parent(x, y, settings);


                this.warpTo = settings.warpTo;

                this.addAnim( 'shutEye',.05, [0] );
                this.addAnim( 'openEye',.05, [1] );

                this.currentAnim = this.anims.shutEye;

            },


            update: function() {
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];


                if ((this.distanceTo(player) < 250 ) && (this.distanceTo(player) > 150 ) ) {


                    this.currentAnim = this.anims.openEye;

                }
                else if ((this.distanceTo(player) < 150 )) {

                   // ig.log("!!** Warp Point Entity Debug Message :: " + this.warpTo + " :: -- ");


                    if (  ig.global[ this.warpTo ] == LevelDrop1 )
                    {
                         //SHIT SPOOKY FUCK
                        ig.music.stop();
                        ig.music.volume = .3;
                        ig.music.play( 'FUCK');
                    }
                    else  if ( ig.game.playerDeathCount == 0)
                    {

                           ig.log("aaaaaaa");
                            ig.music.stop();
                            ig.music.volume = .5;
                            ig.music.play( 'MAP');


                    }

                    ig.game.globalLevel = ig.global[ this.warpTo ];
                    ig.game.loadLevelDeferred( ig.global[ this.warpTo ] );
                }

            }





        });
    });


