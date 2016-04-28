/// <reference path="Abstract.ts" />

module app {
    
    export class Obstacle extends app.Abstract {
        
        constructor( playArea: HTMLElement, width: number = 10, height: number = 10, velocity: number = .5 ) {
            
            super( playArea,width, height, velocity );
            
            this.body.style.bottom = (500 - this.height) + 'px'; // porque no top? para comparar con el bottom de player
            this.body.className = 'obstacle';
        }
    }
}