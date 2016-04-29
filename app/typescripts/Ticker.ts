/// <reference path="Player.ts" />
/// <reference path="IRect.ts" />


module app {
    
    import IRect = app.IRect;
    
    export class Ticker {
        
        private player: app.Player;
        private playArea: HTMLElement;
        constructor( playArea: HTMLElement, player: app.Player ) {
            
            this.player = player;
            this.playArea = playArea;
            
            this.start();
        }
        
        private start (): void {
            
            setInterval( () => {
		
                var rectPlayer = <IRect> {
                    x: parseInt(this.player.body.style.right),
                    y: parseInt(this.player.body.style.bottom),
                    w: parseInt(this.player.body.style.width),
                    h: parseInt(this.player.body.style.height),
                    e: this.player.body
                }
                
                var enemies = this.playArea.getElementsByClassName('enemy');
                if(enemies.length > 0)
                    for (var i = 0; i < enemies.length; i++) {
                        var elEnemy: any = enemies[i];
                        var rect1 = <IRect> {
                            x: parseInt(elEnemy.style.right),
                            y: parseInt(elEnemy.style.bottom),
                            w: parseInt(elEnemy.style.width),
                            h: parseInt(elEnemy.style.height),
                            e: elEnemy
                        }

                        if( Utils.detectCollition(rect1, rectPlayer) ){
                            console.log( "POW!" );
                            this.player.dead();
                        }
                    }
                    
                var obstacles = this.playArea.getElementsByClassName('obstacle');
                if(obstacles.length > 0){
                    for (var i = 0; i < obstacles.length; i++) {
                        var elObstacle: any = obstacles[i];
                        var rect1 = <IRect> {
                            x: parseInt(elObstacle.style.right),
                            y: parseInt(elObstacle.style.bottom),
                            w: parseInt(elObstacle.style.width),
                            h: parseInt(elObstacle.style.height),
                            e: elObstacle
                        }
                        
                        if( !this.player.isDead && Utils.detectCollition(rect1, rectPlayer) ) {
                            console.log( "PAM!" );
                            this.player.dead();
                        }
                    
                        var bullets = this.playArea.getElementsByClassName('bullet');
                        if(bullets.length > 0){
                            for (var i = 0; i < bullets.length; i++) {
                                var elBullet: any = bullets[i];
                                var rect2 = <IRect> {
                                    x: parseInt(elBullet.style.right),
                                    y: parseInt(elBullet.style.bottom),
                                    w: parseInt(elBullet.style.width),
                                    h: parseInt(elBullet.style.height),
                                    e: elBullet
                                }
                                
                                if( Utils.detectCollition(rect1, rect2) ) {
                                    
                                    console.log( "CRASH!" );
                                    TweenMax.killTweensOf( rect1.e );
                                    this.playArea.removeChild( rect1.e );
                                    
                                    TweenMax.killTweensOf( rect2.e );
                                    this.playArea.removeChild( rect2.e );
                                }
                            }
                        }
                    }
                }
            }, 1 );
        }
    }
}