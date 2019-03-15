

ig.module(
        'game.entities.object_angelHangingCorpse1'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityObject_angelHangingCorpse1 = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/angels.png', 90, 90 ),
            size: {x: 90, y:30},
            offset: {x:0, y:-45},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NONE,



            xBobber : 1,
            xCounter : 0,

            init: function( x, y, settings ) {
                this.parent(x, y, settings);

                // Add the animations
                this.addAnim( 'idle', .5, [1] );
                this.currentAnim = this.anims.idle;

            },


            update: function () {
                this.parent();


                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if ( (this.distanceTo(player) < 300) && (  ig.game.playerHasNoPowers  == false ))
                {


                    if ( this.xCounter == 1 || this.xCounter == -2 )
                    {
                        this.xBobber = this.xBobber * -1;
                    }

                    this.xCounter =   this.xCounter + this.xBobber;
                    this.pos.x = this.pos.x +  this.xBobber;



                    //ig.game.playerHasNoPowers = false;
                }



            }




        });
    });





