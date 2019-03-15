ig.module(
        'game.entities.SPOOK'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntitySPOOK = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/spook.png', 200, 400 ),

            size: {x: 200 , y:400},
            offset: {x: 0, y: 0},
            maxVel: {x: 700, y: 700},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides:   ig.Entity.COLLIDES.NONE,



            currentlyTakingDamage : false,
            takingDamageTimer : new ig.Timer(),

            hasUnhookedFromCeilingBool : false,

            thrustInADirectionTimer : new ig.Timer(),

            seenPlayer : false,


            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'idle',.1, [2,2,2,0,1,2,2,2,2,2,2] );
                this.addAnim( 'hiding',.1, [2] );

                this.currentAnim = this.anims.hiding;
            },

            update: function() {



                if ( ig.game.playerDeathCount == 0)
                {
                    var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                    if ( (this.distanceTo(player) < 300) && this.hasUnhookedFromCeilingBool == false )
                    {


                        this.currentAnim = this.anims.idle;
                        this.currentAnim.rewind();


                        this.hasUnhookedFromCeilingBool = true;
                    }


                    if ( this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.idle  )
                    {
                        this.currentAnim.rewind();
                        this.kill();
                    }


                }



                this.parent();
            } ,



            kill: function() {
                //ig.game.spawnEntity( EntityDragonDustDrop, this.pos.x, this.pos.y);
                this.parent();
            }




        });
    });