/// <reference path="Player.ts" />
/// <reference path="Ticker.ts" />
/// <reference path="LevelSelector.ts" />
/// <reference path="Utils.ts" />

module app.game {
    
    import Utils = app.game.Utils;
    import Player = app.game.Player;
    import Ticker = app.game.Ticker;
    import LevelSelector = app.game.LevelSelector;

    export class App {
        
        private player: Player;
        private ticker: Ticker;
        private levelSelector: LevelSelector;
        
        private playArea: HTMLElement;
        
        constructor(){

            this.playArea = document.getElementById( 'js-canvas' );
	        this.player = new Player( this.playArea, 'js-player' );
            
            this.ticker = new Ticker( this.playArea, this.player );
            this.levelSelector = new LevelSelector( this.playArea );
        }
        
        start():void{
            
            this.bindings();
            this.releaseLevels();
        }
        
        private bindings(): void {
            
            // Controles de juego
            document.body.onkeydown = (e) => {
                
                e.preventDefault();
                
                switch (e.which) {

                    //letra j (fuerza)
                    case 74: if( !this.player.isJumping ) { this.player.applyForce(); } break;
                    //letra f (dispara)
                    case 70: this.player.shoot(); break;

                    default: return;
                }
            }
            document.body.onkeyup = (e) => {

                e.preventDefault();
                //letra j (salta)
                if( e.which == 74){ this.player.jump(); }
            }
        }
        
        private releaseLevels(): void {
            setTimeout( () => {
                this.levelSelector.load(1);
            }, 100 );
            
            setTimeout( () => {
                this.levelSelector.load(2);
            }, 12000 );
            
            setTimeout( () => {
                this.levelSelector.load(3);
            }, 20000 );
        }
    }
}