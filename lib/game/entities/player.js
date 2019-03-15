

ig.module(
        'game.entities.player'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityPlayer = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/player.png', 60, 60 ),
            size: {x: 30, y:45},
            offset: {x: 15, y:15},


            flip: false,

            accelGround: 1200,
            accelAir: 700,
            accelJump: 600,
            accelJumpJetting : 350,

            maxVel: {x: 400, y: 1000},

            friction: {x: 2000, y: 0},
            gravityFactor: 2.0,


            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.ACTIVE,


            respawnPointX : 0,
            respawnPointY : 0,

            respawnPointXCamera : 0,
            respawnPointYCamera : 0,


            init: function( x, y, settings ) {
                this.parent( x, y, settings );







                this.respawnPointX = x;
                this.respawnPointY = y;


                // Add the animations
                this.addAnim( 'idle', .5, [0] );
                this.addAnim( 'falling', 0.1, [0,8] );

                this.addAnim( 'run', 0.1, [0] );
                this.addAnim( 'jump',.5, [8] );
                this.addAnim( 'fire',.05, [16] );


                this.addAnim( 'weak',.05, [24] );
                this.addAnim( 'lyingDown',.05, [32] );



                this.addAnim( 'hiding',.05, [1132] );
                //this.addAnim( 'run', 0.1, [8,9,10,11,12,13,14] );
                //this.addAnim( 'jump',.5, [16,17,18] );
                //this.addAnim( 'fire',.05, [24,25,26,27] );


                if ( ig.game.globalLevel ==  LevelTitle)
                {


                    ig.input.unbindAll();

                    ig.input.bind( ig.KEY.SPACE, 'shift' );


                }


            },


            update: function() {




                if ( (this.respawnPointXCamera == 0) && (this.respawnPointYCamera == 0))
                {
                    this.respawnPointXCamera = ig.game.screen.x;
                    this.respawnPointYCamera = ig.game.screen.y;
                }


                if ( ig.game.playerLayingDown == true)
                {

                    // move left or right
                    if( ig.input.pressed('left') ||  ig.input.pressed('right') || ig.input.pressed('jump') ||
                        ig.input.state('left') ||  ig.input.state('right') || ig.input.state('jump')
                        )
                    {


                        this.pos.x++;

                        //ig.log("adsa");
                        ig.game.playerLayingDownMovementCount--;


                        if (  ig.game.playerLayingDownMovementCount <= 0 )
                        {
                            ig.game.playerLayingDown = false;

                            //ig.log("----" +  ig.game.playerLayingDownMovementCount);
                        }


                    }

                }
                else
                {


                    var accel = this.accelGround;
                    if ( this.standing == true || this.onSlope == true)
                    {
                        accel = this.accelGround;
                    }
                    else
                    {
                        accel = this.accelAir;
                    }


                        // move left or right
                        if( ig.input.state('left') ) {
                            this.accel.x = -accel;
                            this.flip = true;
                        }
                        else if( ig.input.state('right') ) {
                            this.accel.x = accel;
                            this.flip = false;
                        }
                        else {
                            this.accel.x = 0;
                        }


                        // jump
                        if( this.standing && ig.input.pressed('jump') ) {

                            this.vel.y = -this.accelJump;

                        }
                        else if(  ig.input.pressed('jump') ) {

                            if ( ig.game.playerHasNoPowers == false)
                            {
                                this.vel.y = -this.accelJump / 1.2;
                            }


                        }


                    if ( ig.game.playerHasNoPowers == false)
                    {
                        // shoot
                        if( ig.input.pressed('fire') ) {
                            ig.game.spawnEntity( EntityFireball, this.pos.x, this.pos.y, {flip:this.flip} );
                        }
                    }







                    this.currentAnim.flip.x = this.flip;





                }


                if ( ig.game.playerLayingDown == true)
                {
                    this.currentAnim = this.anims.lyingDown;
                }
                else if ( ig.game.playerHasNoPowers == true)
                {
                    this.currentAnim = this.anims.weak;
                }
                 else  //I AM FUCKING WULFGAR KILLSMASH
                {

                    if( ig.input.pressed('fire') || ig.input.state('fire') ) {
                        this.currentAnim = this.anims.fire;
                    }
                    else if( this.vel.y > 0 ) {
                        this.currentAnim = this.anims.jump;
                    }
                    else if( this.vel.y < 0 ) {
                        this.currentAnim = this.anims.falling;
                    }
                    else if( this.vel.x != 0 ) {
                        this.currentAnim = this.anims.run;
                    }
                    else {
                        this.currentAnim = this.anims.idle;
                    }


                }


                //***********************************


                if ( ig.game.globalLevel == LevelTitle)
                {
                    this.currentAnim = this.anims.hiding;

                    if ( ig.input.pressed('shift') )
                    {

                        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
                        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );


                        ig.input.bind( ig.KEY.SPACE, 'jump' );
                        ig.input.bind( ig.KEY.Z, 'fire' );

                        ig.game.globalLevel = ig.global['LevelStart'];
                        ig.game.loadLevelDeferred( ig.global['LevelStart'] );
                    }




                }



                this.parent();
            },



            kill: function() {


                //this.parent(); // kill the player as usual


                if ( ig.game.playerHasNoPowers == true)
                {

                    /*
                    ig.log("PLAYER DEATH :: " + ig.music.currentIndex)
                    if ( ig.music.currentIndex != 0)
                    {
                        //ig.music.stop();
                        //ig.music.volume = .5;
                        //ig.music.play( 'MAP');

                    } */

                    ig.game.globalLevel = LevelHallway;

                    ig.game.loadLevelDeferred( ig.global['LevelHallway'] );

                    ig.game.playerDeathCount++;

                    ig.game.playerLayingDown = true;
                    ig.game.playerLayingDownMovementCount = 5;

                }
                else
                {
                    this.health = 100;
                }



            }



        });
    });





