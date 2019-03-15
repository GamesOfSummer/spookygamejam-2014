

ig.module(
        'game.entities.textBox'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityTextBox = ig.Entity.extend({

            //font: new ig.Font( 'media/fontGod.png' ),

            animSheet: new ig.AnimationSheet( 'media/player.png', 60, 60 ),
            size: {x: 30, y:45},

            gravityFactor: 0,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NONE,

            name : null,
            text : null,
            speaker : "",

            init: function( x, y, settings ) {
                this.parent(x, y, settings);



                if ( settings.name != null)
                {
                    this.name = settings.name;
                }

                if ( settings.text != null)
                {

                    this.text = settings.text;
                }

                if ( settings.name != null)
                {
                    this.speaker = settings.speaker;
                }


                //**********************************************************
                if( !ig.global.wm )
                { // Not in WM?



                if ( ig.game.globalLevel ==  LevelHallway )
                {

                    if ( ig.game.playerDeathCount == 0)
                    {
                        if (this.name === 'text1')
                        {
                            this.text = "";
                        }

                    }
                    else if ( ig.game.playerDeathCount == 1)
                    {
                        if (this.name === 'text1')
                        {
                            this.text = "Do you understand yet?";
                        }

                    }
                    else  if ( ig.game.playerDeathCount == 2)
                    {
                        if (this.name === 'text1')
                        {
                            this.text = "You can never leave here.";
                        }
                        else  if (this.name === 'text2')
                        {
                            this.text = "Ever.";
                        }

                    }
                    else  if ( ig.game.playerDeathCount == 3)
                    {
                        if (this.name === 'text1')
                        {
                            this.text = "I do not lie.";
                        }
                        else  if (this.name === 'text2')
                        {
                            this.text = "No one leaves.";
                        }

                    }
                    else  if ( ig.game.playerDeathCount == 3)
                    {
                        if (this.name === 'text1')
                        {
                            this.text = "Please stop.";
                        }
                        else  if (this.name === 'text2')
                        {
                            this.text = "It's pathetic.";
                        }

                    }
                    else
                    {
                        if (this.name === 'text1')
                        {
                            this.text = "";
                        }
                        else  if (this.name === 'text2')
                        {
                            this.text = "";
                        }
                    }
                }
                else  if ( ig.game.globalLevel ==  LevelMAP )
                {
                    if (ig.game.playerDeathCount == 0) {
                        if (this.name === 'text1') {
                            this.text = "Welcome to your new home.";
                        }

                    }
                    else
                    {
                        if (this.name === 'text1') {
                            this.text = "";
                        }
                    }
                }



                }//end of not in WM


            },


            draw: function () {
                this.parent();


                if ( this.text != null)
                {


                    var font =  new ig.Font( 'media/fontGod.png' );
                     if ( this.speaker == 'Urza')
                     {
                         font =  new ig.Font( 'media/fontUrza.png' );
                     }

                    font.draw( this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.LEFT);

                }


            }




        });
    });





