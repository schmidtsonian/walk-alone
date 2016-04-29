/// <reference path="definitions/greensock/greensock.d.ts" />

module app {
    
    export class Abstract {
        
        protected playArea: HTMLElement;
        protected body: HTMLElement;
        protected height: number;
        protected width: number;
        protected velocity: number;
         
        constructor( playArea: HTMLElement, width: number, height: number, velocity: number) {
            
            this.playArea = playArea;
            this.height = height; 
            this.width = width; 
            this.velocity = velocity;
            
            this.body = document.createElement( 'div' );
            
            this.body.style.right = ( this.width * -1 ) + 'px';
            this.body.style.width = this.width + 'px';
            this.body.style.height = this.height + 'px';
            
            
            this.body.style.bottom = '0';
            this.body.className = 'enemy';
        }
        
        release ( timeout: number = 0 ): void {
            
            setTimeout( () => {
                
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