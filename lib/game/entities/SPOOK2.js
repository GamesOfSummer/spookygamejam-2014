ig.module(
        'game.entities.SPOOK2'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntitySPOOK2 = ig.Entity.extend({ animSheet: new ig.AnimationSheet( 'media/lurker.png', 210, 210 ),

            size: {x: 150 , y:150},
            offset: {x: 0, y: 0},
            maxVel: {x: 700, y: 700},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides:   ig.Entity.COLLIDES.NONE,


            currentlyTakingDamage : false,
            takingDamageTimer : new ig.Timer(),

            hasUnhookedFromCeilingBool : false,

            thrustInADirectionTimer : new ig.Timer(),

            seenPlayer : false,


            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'idle',.05, [2,2,2,2,2,1,1,0,2,2,2,2,2,2] );
                this.addAnim( 'hiding',.1, [3] );

                this.currentAnim = this.anims.hiding;
            },

            update: function() {


                    var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                    if ( (this.distanceTo(player) < 100) )
                    {
                        var sound = new ig.Sound('media/sounds/spook2.ogg');
                        sound.play();

                        this.currentAnim = this.anims.idle;
                        this.currentAnim.rewind();

                    }


                    if ( this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.idle  )
                    {
                        this.currentAnim.rewind();
                        this.kill();
                    }

                this.parent();
            } ,



            kill: function() {
                //ig.game.spawnEntity( EntityDragonDustDrop, this.pos.x, this.pos.y);
                this.parent();
            }




        });
    });