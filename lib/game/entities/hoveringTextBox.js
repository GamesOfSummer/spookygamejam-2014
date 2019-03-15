

ig.module(
        'game.entities.hoveringTextBox'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityHoveringTextBox = ig.Entity.extend({

            font: new ig.Font( 'media/04b03.font.png' ),

            animSheet: new ig.AnimationSheet( 'media/player.png', 60, 60 ),
            size: {x: 30, y:45},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.ACTIVE,

            name : null,


            timer : new ig.Timer(),

            init: function( x, y, settings ) {
                this.parent(x, y, settings);

               // ig.log("aaaa -" + settings.name + " -- ");


                this.name = settings.name;

                this.timer= new ig.Timer();
               // this.timer.set(2);

            },


            update: function()
            {

                 // urza taunts you whoooo
                if ( ig.game.globalLevel ==  LevelDrop1 )
                {

                    if (  this.timer.delta() < 3 )
                    {
                        this.name = "Hello, Eo.";

                    }
                    if ( this.timer.delta() >  4 && this.timer.delta() < 8 )
                    {
                        this.name = "Your God will not reach you here, in my mind...";
                    }
                    else if ( this.timer.delta() >  8 && this.timer.delta() < 14 )
                    {
                        this.name = "I will strip you of everything, as I have the others.";

                    }
                    else if ( this.timer.delta() >  6 && this.timer.delta() < 20 )
                    {



                        //SHIT SPOOKY FUCK
                        ig.music.stop();
                        ig.music.volume = .5;
                        ig.music.play( 'hallway');


                         ig.game.playerLayingDown = true;
                         ig.game.playerLayingDownMovementCount = 25;

                           ig.game.playerHasNoPowers = true;

                        ig.game.globalLevel = ig.global['LevelHallway'];
                        ig.game.loadLevelDeferred( ig.global['LevelHallway'] );


                    }

                }
            },

            draw: function () {
                this.parent();

                var font =  new ig.Font( 'media/fontUrza.png' );
                 font.draw( this.name, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.CENTER);


            }




        });
    });





