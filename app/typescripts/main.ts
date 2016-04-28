/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="Obstacle.ts" />

// Definición de niveles
var levels = [
	/*1*/
	[
		{
			type: 'enemy',
			time: 0.2,
			width: 10,
			height: 100,
			velocity: 5,
		},
		{
			type: 'enemy',
			time: 2,
			width: 10,
			height: 100,
			velocity: 3,
		},
		{
			type: 'enemy',
			time: 5,
			width: 20,
			height: 120,
			velocity: 4,
		}
	],
	
	/*2*/
	[
		{
			type: 'obstacle',
			time: 0.2,
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
			type: 'enemy',
			time: 5,
			width: 20,
			height: 120,
			velocity: 4,
		}
	]
];


import Player = app.Player;
import Enemy = app.Enemy;
import Obstacle = app.Obstacle;

var player: Player;
var playArea: HTMLElement;

(function () {
	
	playArea = document.getElementById( 'js-canvas' );
	player = new Player('js-player');


	// Controles
	document.body.onkeydown = (e) => {
		switch (e.which) {

			case 74: //j letter
				if( !player.isJumping )
					player.applyForce(); 
				break;

			case 70: //f letter
				player.shoot(); 
				break;

			default: return;
		}
		e.preventDefault();
	}
	
	document.body.onkeyup = (e) => {

		switch (e.which) {
			case 74: player.jump(); break; //j letter

			default: return;
		}
		e.preventDefault();
	}
})();


// Carga un nivel!
function loadLevel ( lvl: number = 0) : boolean {
	
	if( lvl < 1 || lvl > levels.length ) return false;
	lvl = lvl - 1;
	
	for (var i = 0; i < levels[ lvl ].length; i++) {
		
		var value = levels[ lvl ][i];

		switch ( value.type ) {

			case 'enemy':
				
				var enemy = new Enemy( playArea, value.width, value.height, value.velocity );
				enemy.release( value.time );
				break;

			case 'obstacle':
				
				var obstacle = new Obstacle( playArea, value.width, value.height, value.velocity );
				obstacle.release( value.time );
				break;
		}
		
	}
	
	return true;
}
