ig.module(
        'game.entities.lurker'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityLurker = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/lurker.png', 210, 210 ),

            size: {x: 150 , y:150},
            offset: {x: 0, y: 0},
            maxVel: {x: 700, y: 700},

            gravityFactor: 0,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides:   ig.Entity.COLLIDES.FIXED,



            currentlyTakingDamage : false,
            takingDamageTimer : new ig.Timer(),

            hasUnhookedFromCeilingBool : false,

            thrustInADirectionTimer : new ig.Timer(),

            seenPlayer : false,


            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'idle',.1, [2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2] );
                //this.addAnim( 'hovering',1, [3] );
                this.addAnim( 'mauling',.1, [2,2,2,1,0,2,2,2] );

                this.thrustInADirectionTimer = new ig.Timer();
                this.currentAnim = this.anims.idle;
            },

            update: function() {


                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if ( (this.distanceTo(player) < 400) && (this.thrustInADirectionTimer.delta() > 0) && this.seenPlayer == true)
                {

                    if ( this.pos.x < player.pos.x)
                    {
                       this.accel.x = 500;
                        this.currentAnim.flip.x = true;
                    }
                    else
                    {
                        this.accel.x = -500;
                        this.currentAnim.flip.x = false;
                    }


                    //*************************

                    if ( this.pos.y < player.pos.y)
                    {
                        this.accel.y = 500;
                    }
                    else
                    {
                        this.accel.y = -500;
                    }


                    var sound = new ig.Sound('media/sounds/spook2.ogg');
                    sound.play();

                    this.thrustInADirectionTimer.set(.1);
                   // this.currentAnim = this.anims.mauling;

                }
                else if ( (this.distanceTo(player) < 360) && this.seenPlayer == false  )
                {



                    this.seenPlayer = true;
                    this.currentAnim = this.anims.mauling;
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