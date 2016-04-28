/// <reference path="definitions/greensock/greensock.d.ts" />

/// <reference path="Utils.ts" />

module app {
    
    import Utils = app.Utils;
    
    export class Player {
        
        private body: HTMLElement;
        private forceJump: number;
        private _isJumping: boolean = false;

        constructor ( elementName: string ) {
            
            this.body = document.getElementById( elementName );
            this.forceJump = 0;
        }
        
        shoot (): void {
         
            console.log('shoot');   
        }
        
        reloadArmor (): void {
            
            console.log('reloadArmor');
        }
        
        applyForce = Utils.throttle( () => {

            this.forceJump = this.forceJump < 1 ? this.forceJump + 0.1 : 1;
            
            TweenMax.to(this.body, 0.1, {height: 50 - (20 * this.forceJump)});
            console.log('apply force', this.forceJump);  
        }, 50 );
        
        jump = Utils.debounce( () => {

            if(this.isJumping) return;

            this.isJumping = true;
            console.log('jump! at ', this.forceJump * 100);
            
            TweenMax.to(this.body, 0.5 * this.forceJump, { height: '80px', bottom: 420 * this.forceJump, onComplete: () => {
                
                // todos los objetos caen a la misma velocidad segun newton no?
                TweenMax.to(this.body, 0.5 * this.forceJump, { height: '50px', bottom: 0, onComplete: () => {
                    
                    this.isJumping = false;
                    this.forceJump = 0;
                    console.log('reset force')
                    
                } } );
            } });
        }, 250 );
        
        dead (): void {
            
            console.log('dead');
        }
        
        set isJumping ( isJumping:boolean ) { this._isJumping = isJumping; }
        get isJumping () { return this._isJumping } 
    }
}