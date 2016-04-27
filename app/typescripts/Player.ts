// <reference path="definitions/greensock/greensock.d.ts" />

/// <reference path="Utils.ts" />

module app {
    
    import Utils = app.Utils;
    
    export class Player {
        
        private body: HTMLElement;
        private forceJump: number;
        private _isJumping: boolean = false;

        constructor ( elementName: string ) {
            
            this.body = document.getElementById( elementName );
            this.forceJump = 1;
        }
        
        shoot (): void {
         
            console.log('shoot');   
        }
        
        reloadArmor (): void {
            
            console.log('reloadArmor');
        }
        
        applyForce = Utils.throttle( () => {

            this.forceJump = this.forceJump < 10 ? this.forceJump + 1 : 10;
            console.log('apply force', this.forceJump);  
        }, 50 );
        
        jump = Utils.debounce( () => {
            
            if(this.isJumping) return;
            
            this.isJumping = true;
            console.log('jump! at ', this.forceJump * 100);
            
            setTimeout( () => {
                this.isJumping = false;
                this.forceJump = 1;
                console.log('reset force')
            }, 100 * this.forceJump );
        }, 250 );
        
        dead (): void {
            
            console.log('dead');
        }
        
        set isJumping ( isJumping:boolean ) { this._isJumping = isJumping; }
        get isJumping () { return this._isJumping } 
    }
}