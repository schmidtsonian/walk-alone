/// <reference path="definitions/greensock/greensock.d.ts" />

module app {
    
    export class Enemy {
        
        private playArea: HTMLElement;
        private body: HTMLElement;
        private height: number;
        private width: number;
        private velocity: number;

        private right: number = 0;
         
        constructor( playArea: HTMLElement, width: number = 10, height: number = 10, velocity: number = .5 ) {
            
            this.playArea = playArea;
            this.height = height; 
            this.width = width; 
            this.velocity = velocity;
            
            this.body = document.createElement( 'div' );
            this.body.className = 'enemy';
            
            this.body.style.right = ( this.width * -1 ) + 'px';
            this.body.style.width = this.width + 'px';
            this.body.style.height = this.height + 'px';
            this.body.style.bottom = '0';
        }
        
        release ( timeout: number = 0 ): void {
            
            setTimeout( () => {
                console.log('release enemy!')
                this.playArea.appendChild( this.body );
                
                TweenLite.to(this.body, 1 * this.velocity, { right: '768px', onComplete: this.destroy.bind(this) });
                
            }, timeout * 1000 );
        }
        
        destroy (): void {
            
            TweenMax.killTweensOf(this.body);
            this.playArea.removeChild(this.body);
        }
        
    }
}