ig.module(
        'game.entities.redLines'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityRedLines = ig.Entity.extend({ animSheet: new ig.AnimationSheet( 'media/redLines.png', 300, 300 ),

            size: {x: 300 , y:300},
            offset: {x: 0, y: 0},
            maxVel: {x: 700, y: 700},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides:   ig.Entity.COLLIDES.NONE,


            zIndex : -20,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'idle',.05, [2,0,2,0,2] );
                this.addAnim( 'hiding',.1, [2] );

                this.currentAnim = this.anims.hiding;
            },

            update: function() {


                    var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                    if ( (this.distanceTo(player) < 200) )
                    {

                        this.currentAnim = this.anims.idle;

                    }
                        else
                    {
                        this.currentAnim = this.anims.hiding;
                    }







                this.parent();
            }


        });
    });