/// <reference path="Abstract.ts" />

module app.game {
    
    export class Enemy extends app.game.Abstract {
        
        constructor( playArea: HTMLElement, width: number = 10, height: number = 10, velocity: number = .5 ) {
            
            super( playArea,width, height, velocity );
            
            this.body.style.bottom = '0';
            this.body.className = 'enemy';
        }
        
    }
}