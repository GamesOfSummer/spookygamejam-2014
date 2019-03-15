ig.module(
        'game.entities.runningDustParticle'
    ).requires(
        'impact.entity'
    ).defines(function(){

        EntityRunningDustParticle = ig.Entity.extend({

            animSheet: new ig.AnimationSheet( 'media/particle.png', 15, 15 ),
            size: {x: 15, y:15},
            offset: {x: 5, y: 5},

            // particle will collide but not effect other entities
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            // default particle lifetime & fadetime
            lifetime: 30,
            alpha: 255,

            init:function( x, y, settings ){
                this.parent( x, y, settings );

                // Add the animations
               // this.addAnim( 'idle', .5, [4,5,6,7] );
                this.addAnim( 'idle', .1, [4,5] );


                this.vel.y = (Math.random()*3)-400;

                // init timer for fadetime
                this.idleTimer = new ig.Timer();
            },

            update: function() {



                if ( this.currentAnim.loopCount >= 1)
                {
                    this.kill();
                }


                this.parent();
            },



            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y || res.collision.slope ) {
                    //this.kill();
                }

            }


        });
    });