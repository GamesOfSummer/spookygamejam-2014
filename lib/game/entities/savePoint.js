ig.module(
        'game.entities.savePoint'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntitySavePoint = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/dysaurLurker.png', 150, 120 ),

            size: {x: 90 , y:90},
            offset: {x: 45, y: 30},
            maxVel: {x: 800, y: 800},

            gravityFactor: 0,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides:   ig.Entity.COLLIDES.FIXED,



            currentlyTakingDamage : false,
            takingDamageTimer : new ig.Timer(),

            hasUnhookedFromCeilingBool : false,

            thrustInADirectionTimer : new ig.Timer(),


            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'onCeiling',1, [0,1] );
                this.addAnim( 'hovering',1, [3] );
                this.addAnim( 'mauling',.1, [6] );

                this.thrustInADirectionTimer = new ig.Timer();
                //this.currentAnim = this.anims.onCeiling;
            },

            update: function() {


                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if ( (this.distanceTo(player) < 300) && (this.thrustInADirectionTimer.delta() > 0) )
                {

                    if ( this.pos.x < player.pos.x)
                    {
                       this.accel.x = 600;
                        this.currentAnim.flip.x = true;
                    }
                    else
                    {
                        this.accel.x = -600;
                        this.currentAnim.flip.x = false;
                    }


                    //*************************

                    if ( this.pos.y < player.pos.y)
                    {
                        this.accel.y = 600;
                    }
                    else
                    {
                        this.accel.y = -600;
                    }

                    this.thrustInADirectionTimer.set(.1);
                    this.currentAnim = this.anims.mauling;

                }
                else if ( (this.distanceTo(player) > 300) )
                {

                    this.vel.x = 0;
                    this.vel.y = 0;

                    this.currentAnim = this.anims.hovering;

                }


                this.parent();
            },



            check: function( other ) {
                other.receiveDamage( 10, this );
                this.kill();
            },



            //changing to 'hurt' animation
            receiveDamage: function( amount, from ) {
                this.takingDamageTimer.set(.1);
                this.parent( amount, from );
            },



            kill: function() {
                //ig.game.spawnEntity( EntityDragonDustDrop, this.pos.x, this.pos.y);
                this.parent();
            }
        });
    });