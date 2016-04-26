module app {
    
    export class Player {
        
        private body: HTMLElement;

        constructor ( elementName: string ) {
            
            this.body = document.getElementById( elementName );
        }
        
        shoot (): void {
         
            console.log('shoot');   
        }
        
        reloadArmor (): void {
            
            console.log('reloadArmor');
        }
        
        jump (): void {
            
            console.log('jump');
        }
        
        dead (): void {
            
            console.log('dead');
        }        
    }
}