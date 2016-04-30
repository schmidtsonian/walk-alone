/// <reference path="Enemy.ts" />
/// <reference path="Obstacle.ts" />

// Definición de niveles
var levels = [
	/*1*/
	[
		{
			type: 'obstacle',
			time: .2,
			width: 10,
			height: 500,
			velocity: 5,
		},
		{
			type: 'obstacle',
			time: 3,
			width: 10,
			height: 400,
			velocity: 5,
		},
		{
			type: 'obstacle',
			time: 6,
			width: 10,
			height: 120,
			velocity: 5,
		}
	],
	/*2*/
	[
		{
			type: 'enemy',
			time: 0.2,
			width: 10,
			height: 300,
			velocity: 5,
		},
		{
			type: 'obstacle',
			time: 2,
			width: 10,
			height: 100,
			velocity: 3,
		},
		{
			type: 'obstacle',
			time: 5,
			width: 20,
			height: 430,
			velocity: 4,
		}
	],
	
	/*3*/
	[
		{
			type: 'obstacle',
			time: .2,
			width: 10,
			height: 200,
			velocity: 5,
		},
		{
			type: 'enemy',
			time: .2,
			width: 10,
			height: 200,
			velocity: 5,
		},
		
		{
			type: 'obstacle',
			time: 5.2,
			width: 10,
			height: 350,
			velocity: 5,
		},
		{
			type: 'enemy',
			time: 5.2,
			width: 10,
			height: 100,
			velocity: 5,
		},
	],
];

module app.game {
    
    import Enemy = app.game.Enemy;
    import Obstacle = app.game.Obstacle;

    export class LevelSelector {
        
        private playArea: HTMLElement;
        
        constructor( playArea: HTMLElement ) {
            
            this.playArea = playArea;
        }
        
        // Carga un nivel!
        load ( lvl: number = 0) : boolean {
            
            console.log('Load LVL -> ', lvl -1);
            if( lvl < 1 || lvl > levels.length ) return false;
            lvl = lvl - 1;
            
            for (var i = 0; i < levels[ lvl ].length; i++) {
                
                var value = levels[ lvl ][ i ];
                var object: Enemy | Obstacle;

                switch ( value.type ) {

                    case 'enemy':
                        object = new Enemy( this.playArea, value.width, value.height, value.velocity );
                        break;

                    case 'obstacle':
                        object = new Obstacle( this.playArea, value.width, value.height, value.velocity );
                        break;
                }
                object.release( value.time );
            }
            
            return true;
        }
    }
    
}