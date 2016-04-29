/// <reference path="definitions/greensock/greensock.d.ts" />

/// <reference path="Utils.ts" />

module app {
    
    import Utils = app.Utils;
    
    export class Player {
        
        body: HTMLElement;
        
        protected playArea: HTMLElement;
        private forceJump: number;
        isDead: boolean;
        private _isJumping: boolean = false;

        constructor ( playArea: HTMLElement, elementName: string ) {
            
            this.playArea = playArea;
            
            this.body = document.getElementById( elementName );
            this.body.style.bottom = '0px';
            this.body.style.width = '50px';
            this.body.style.height = '50px';
            this.body.style.right = '708px'; //porque no left? para comparar con 'right' de obstaculos o enemigos
    
            this.forceJump = 0;
            this.isDead = false;
        }
        
        private msgDead(): void {
            
            console.log('ESTAS MUERTO! No te puedes jugar mas!.');
        }
        
        shoot = Utils.throttle( () => {
         
            if( this.isDead ){
                this.msgDead();
                return;
            } 
            
            var bullet = document.createElement( 'div' );
            bullet.className = 'bullet';
            bullet.style.width = '10px';
            bullet.style.height = '10px';
            bullet.style.bottom =  parseInt(this.body.style.bottom) + 25 + 'px';
            this.playArea.appendChild( bullet );
            TweenLite.to(bullet, 5.75, {right: -20, onComplete:() => {
                TweenMax.killTweensOf( bullet );
                this.playArea.removeChild( bullet );
            } });

            console.log('shoot');   
        }, 500 );
        
        applyForce = Utils.throttle( () => {

            if( this.isDead ){
                this.msgDead();
                return;
            }
            
            this.forceJump = this.forceJump < 1 ? this.forceJump + 0.1 : 1;
            
            TweenMax.killTweensOf(this.body);
            TweenMax.to(this.body, 0.25, {height: 50 - (20 * this.forceJump)});
        }, 1 );
        
        jump = Utils.debounce( () => {

            if( this.isJumping || this.isDead ){
                this.msgDead();
                return;
            } 

            this.isJumping = true;
            
            TweenMax.to(this.body, 2 * this.forceJump, { height: '80px', bottom: 420 * this.forceJump, onComplete: () => {
                
                TweenMax.to(this.body, 1.6 * this.forceJump, { height: '50px', bottom: 0, onComplete: () => {
                    
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