ig.module(
        'game.entities.dragonDustDropFluff'
    ).requires(
        'impact.entity'
    ).defines(function(){

        EntityDragonDustDropFluff = ig.Entity.extend({


            animSheet: new ig.AnimationSheet( 'media/dragonDustDrop.png', 30, 30 ),
            maxVel: {x: 1800, y: 1800},
            size: {x: 30, y:30},
            offset: {x: 15, y: 15},

            bounciness: .6,

            // particle will collide but not effect other entities
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,


            floatUpwards: false,

            // default particle lifetime & fadetime
            lifetime: 35,
            alpha: 255,



            stallTimer : null,

            init:function( x, y, settings ){
                this.parent( x, y, settings );


                var frame = Math.floor((Math.random()*4)+5);

                this.addAnim( 'idle',.03, [ frame ] );


               if ( Math.floor((Math.random()*3)+1) < 3)
               {
                  // this.floatUpwards = true;


                       this.lifetime = 65;
                   //this.alpha: 255,


               }
                else
               {
                   this.lifetime = 25;
                   //this.alpha: 255,

               }



                // init timer for fadetime
                this.stallTimer = new ig.Timer();
                this.stallTimer.set(-1);
            },

            update: function() {



                if ( this.stallTimer.delta() > .2)
                {
                    // bounce!


                    if ( this.floatUpwards == true)
                    {
                        var vx = 50;
                        var vy = 100;

                        this.vel.x = (Math.random()*2 - 1)*vx;
                        this.vel.y = (Math.random()*2 - 1)*vy;
                        if ( this.vel.y > 1)
                        {
                            this.vel.y = this.vel.y * -1;
                        }


                    }
                    else
                    {
                        var vx = 100;
                        var vy = 150;

                        this.vel.x = (Math.random()*2 - 1)*vx;
                        this.vel.y = (Math.random()*2 - 1)*vy;
                        if ( this.vel.y < 1)
                        {
                            this.vel.y = this.vel.y * -1;
                        }

                    }



                    this.stallTimer = new ig.Timer();

                }


                this.lifetime--;


                // check if particle has exsisted past lifetime
                // if so, remove particle
                if( this.lifetime < 0){
                    this.kill();

                }
                else if ( this.lifetime > 0 && this.lifetime < 15 )
                {

                    this.currentAnim.alpha = .5
                }

                this.parent();
            },



            handleMovementTrace: function(res) {
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            }






        });
    });