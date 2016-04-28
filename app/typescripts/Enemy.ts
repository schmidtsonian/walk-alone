/// <reference path="Abstract.ts" />

module app {
    
    export class Enemy extends app.Abstract {
        
        constructor( playArea: HTMLElement, width: number = 10, height: number = 10, velocity: number = .5 ) {
            
            super( playArea,width, height, velocity );
            
            this.body.style.bottom = '0';
            this.body.className = 'enemy';
        }
        
    }
}