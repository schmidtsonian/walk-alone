// <reference path="definitions/greensock/greensock.d.ts" />

/// <reference path="Utils.ts" />

module app {
    
    import Utils = app.Utils;
    
    export class Player {
        
        private body: HTMLElement;
        private forceJump: number;

        constructor ( elementName: string ) {
            
            this.body = document.getElementById( elementName );
        }
        
        shoot (): void {
         
            console.log('shoot');   
        }
        
        reloadArmor (): void {
            
            console.log('reloadArmor');
        }
        
        applyForce = Utils.throttle( () => {
            console.log('apply force');
        }, 250 );
        
        jump = Utils.debounce( () => {
            console.log('jump!');
        }, 250 );
        
        dead (): void {
            
            console.log('dead');
        }    
    }
}