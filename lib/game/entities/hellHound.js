ig.module(
        'game.entities.hellHound'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityHellHound = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/hellHound.png', 90, 90 ),
            size: {x: 90, y:30},
            offset: {x: 15, y: 60},


            gravity :.1,

            flip : true,
            maxVel: {x: 400, y: 300},

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.ACTIVE,

            seenPlayer : false,


            eatingSound : "",
            eatingSoundSpamTimer : new ig.Timer(),

            barkSound : "",


            init: function( x, y, settings ) {
                this.parent( x, y, settings );


                this.eatingSound = new ig.Sound('media/sounds/eating.ogg');
                this.eatingSoundSpamTimer =  new ig.Timer();


                this.barkSound = new ig.Sound('media/sounds/hellHoundBark.wav');

                this.addAnim( 'idle', 1, [0,0,0,0,1] );
                this.addAnim( 'running', .01, [2] );

                this.currentAnim = this.anims.idle;
            },


            update: function() {



                var player = ig.game.getEntitiesByType( EntityPlayer )[0];




                if ( (this.distanceTo(player) < 300 && this.distanceTo(player) > 180 )
                    && (this.seenPlayer == false ) &&
                    this.eatingSoundSpamTimer.delta() > 0)
                {
                   this.eatingSound.play();
                   this.eatingSoundSpamTimer.set(6);


                }

                else if ( (this.distanceTo(player) < 180) && (this.seenPlayer == false ))
                {
                    this.seenPlayer = true;


                    this.eatingSound.stop();
                    this.barkSound.play();


                    if ( this.pos.x < player.pos.x)
                    {
                        this.flip = true;
                    }
                    else
                    {
                        this.flip = false;
                    }

                    this.currentAnim = this.anims.running;

                }
                else if ( this.seenPlayer == true)
                {

                    this.currentAnim.flip.x = this.flip;

                    var xdir = this.flip ? 1 : -1;
                    this.vel.x = this.maxVel.x * xdir;




                }


                // move!
                this.parent();
            },



            handleMovementTrace: function( res ) {
                this.parent( res );

                // collision with a wall? return!
                if( res.collision.x ) {
                    this.flip = !this.flip;
                }
            },

			
			 check: function( other ) {
                other.receiveDamage( 10, this );
            }


        });
    });





