/// <reference path="definitions/greensock/greensock.d.ts" />

/// <reference path="Utils.ts" />

module app {
    
    import Utils = app.Utils;
    
    export class Player {
        
        private body: HTMLElement;
        private forceJump: number;
        private isDead: boolean;
        private _isJumping: boolean = false;

        constructor ( elementName: string ) {
            
            this.body = document.getElementById( elementName );
            this.forceJump = 0;
            this.isDead = false;
        }
        
        private msgDead(): void {
            
            console.log('ESTAS MUERTO! No te puedes mover.');
        }
        
        shoot (): void {
         
            console.log('shoot');   
        }
        
        reloadArmor (): void {
            
            console.log('reloadArmor');
        }
        
        applyForce = Utils.throttle( () => {

            if( this.isDead ){
                this.msgDead();
                return;
            }
            
            this.forceJump = this.forceJump < 1 ? this.forceJump + 0.1 : 1;
            
            TweenMax.to(this.body, 0.1, {height: 50 - (20 * this.forceJump)});
        }, 50 );
        
        jump = Utils.debounce( () => {

            if( this.isJumping || this.isDead ){
                this.msgDead();
                return;
            } 

            this.isJumping = true;
            
            TweenMax.to(this.body, 0.5 * this.forceJump, { height: '80px', bottom: 420 * this.forceJump, onComplete: () => {
                
                TweenMax.to(this.body, 2 * this.forceJump, { height: '50px', bottom: 0, onComplete: () => {
                    
                    this.isJumping = false;
                    this.forceJump = 0;
                } } );
            } });
        }, 250 );
        
        dead (): void {
            
            this.isDead = true;

            console.log('dead');
        }
        
        set isJumping ( isJumping:boolean ) { this._isJumping = isJumping; }
        get isJumping () { return this._isJumping } 
    }
}