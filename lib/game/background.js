ig.module(
    'game.background'
).requires(
    'impact.entity'

).defines(function(){

        EntityBackground = ig.Class.extend({

            init: function(){

               // ig.log( ig.game.globalLevel);

                ig.Game.inject({



                    mapBackground:null,

                    //W1L1 background variables
                    titanBackground : null,
                    forestBackground:null,
                    forest2Background:null,
                    skyBackground: null,
                    starsBackground: null,

                    //john mule variables
                    jmSkyBackground : null,
                    jmCloud1Background : null,
                    jmCloud2Background : null,



                    smoke: null,
                    startBackground : null,


                    //hallway
                    hallwayForeground : null,


                    //debugRoom
                    debugRoomBackground : null,

                    variablesBeenSet : false,

                    init: function(){

                       // ig.log("aaa --- " + ig.game.globalLevel);


                    },

                    update: function () {

                        if ( this.variablesBeenSet == false)
                        {
                            // Create BackgroundMap
                            var data = [
                                [1,1,1],
                                [1,1,1],
                                [1,1,1]
                            ];

                            //*********************************************



                            this.forestBackground = new ig.BackgroundMap(600, data, 'media/drop1/redDrop.png');
                            this.forestBackground.repeat = true;


                            this.forestBackground2 = new ig.BackgroundMap(600, data, 'media/drop1/forest2.png');
                            this.forestBackground2.repeat = true;

                            this.blackDrop = new ig.BackgroundMap(600, data, 'media/drop1/blackDrop.png');
                            //this.forestBackground2.repeat = true;


                            this.mapBackground = new ig.BackgroundMap(600, data, 'media/map/mapBackground.png');
                            //this.forestBackground2.repeat = true;


                            this.startBackground = new ig.BackgroundMap(600, data, 'media/start/startBackground.png');
                            this.startBackground.scroll.y =+ 150;
                            this.smoke = new ig.BackgroundMap(600, data, 'media/start/smoke.png');



                            this.hallwayForeground = new ig.BackgroundMap(500, data, 'media/hallway/hallwayBackground.png');
                            this.hallwayForeground.repeat = true;


                            this._mapWidth = ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - (ig.system.width);
                            this._mapHeight = ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize - (ig.system.height);

                            this.variablesBeenSet = true;

                        }



                        if ( ig.game.globalLevel ==  LevelDrop1 )
                        {
                            this.forestBackground.scroll.y += ig.system.tick * 1000;

                        }
                        else if (ig.game.globalLevel ==  LevelStart)
                        {


                            if (  this.smoke.scroll.y < 60)
                            {
                                this.smoke.scroll.y += ig.system.tick / 2;
                            }


                           this.smoke.scroll.x -= ig.system.tick;


                        }
                        else if ( ig.game.globalLevel ==  LevelHallway ) {


                            var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                            if (player) {


                                //**//*********
                                // prevent background from scrolling if close to a map edge

                                var x = player.pos.x - (ig.system.width / 2);
                                if (x > 0 && x < this._mapWidth) {
                                    this.hallwayForeground.scroll.x += (player.vel.x / 90);

                                }


                            }
                        }
                        else if ( ig.game.globalLevel ==  LevelTitle)
                        {

                            this.hallwayForeground.scroll.x += ig.system.tick * 10;
                        }


                        this.parent();

                    },//end of update function



                    draw: function() {
                        //this updates constantly



                        if ( ig.game.globalLevel ==  LevelDrop1 )
                        {

                            this.forestBackground.draw();
                            this.blackDrop.draw();
                        }
                        else if ( ig.game.globalLevel ==  LevelMAP )
                        {

                            this.mapBackground.draw();
                        }
                        else if ( ig.game.globalLevel ==  LevelHallway )
                        {


                            this.mapBackground.draw();
                            this.hallwayForeground.draw();



                        }
                        else if ( ig.game.globalLevel ==  LevelStart )
                        {
                            this.startBackground.draw();
                            this.smoke.draw();
                        }
                        else if ( ig.game.globalLevel ==  LevelTitle)
                        {

                            this.mapBackground.draw();
                            this.hallwayForeground.draw();

                        }



                        this.parent();

                    }//end of draw function

                })//end of inject function

            } //end of init fuction

        });
    });


