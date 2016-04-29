/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="Obstacle.ts" />
/// <reference path="Utils.ts" />

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










import Utils = app.Utils;
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

		switch (true) {
			case (e.which == 74): player.jump(); break; //j letter, yes it's weird this comparation
			case ((e.which - 48) > 0 && (e.which - 48) <= 5): loadLevel(e.which-48); break;
			default: return;
		}
		e.preventDefault();
	}
	
	ticker();
})();


// Checo posición de elementos cada 100 milisegundos
function ticker ():void {
	
	setInterval( () => {
		
		var enemies = playArea.getElementsByClassName('enemy');
		for (var i = 0; i < enemies.length; i++) {
			var element: any = enemies[i];
			console.log(element.style.right);
		}
		
		var obstacles = playArea.getElementsByClassName('obstacle');
		for (var i = 0; i < obstacles.length; i++) {
			var element: any = obstacles[i];
			console.log(element.style.right);
		}

	}, 100 );
}

// Carga un nivel!
function loadLevel ( lvl: number = 0) : boolean {
	
	if( lvl < 1 || lvl > levels.length ) return false;
	lvl = lvl - 1;
	
	for (var i = 0; i < levels[ lvl ].length; i++) {
		
		var value = levels[ lvl ][ i ];
		var object: Enemy | Obstacle;

		switch ( value.type ) {

			case 'enemy':
				object = new Enemy( playArea, value.width, value.height, value.velocity );
				break;

			case 'obstacle':
				object = new Obstacle( playArea, value.width, value.height, value.velocity );
				break;
		}
		object.release( value.time );
	}
	
	return true;
}
