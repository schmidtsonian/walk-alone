/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="Obstacle.ts" />
/// <reference path="Utils.ts" />

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
			height: 400,
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


import Utils = app.Utils;
import Player = app.Player;
import Enemy = app.Enemy;
import Obstacle = app.Obstacle;

var player: Player;
var playArea: HTMLElement;

(function () {
	
	playArea = document.getElementById( 'js-canvas' );
	player = new Player(playArea, 'js-player');

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
			case ((e.which - 48) > 0 && (e.which - 48) <= 3): loadLevel(e.which-48); break;
			default: return;
		}
		e.preventDefault();
	}
	
	ticker();
})();

interface iRect {
	
	x: number;
	y: number;
	w: number;
	h: number;
	e: HTMLElement;
}

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function detectCollition( rect1: iRect, rect2: iRect): boolean {

	if (rect1.x < rect2.x + rect2.w &&
		rect1.x + rect1.w > rect2.x &&
		rect1.y < rect2.y + rect2.h &&
		rect1.h + rect1.y > rect2.y) {
			return true;
		}
	return false;
}

// Checo posición de elementos cada 100 milisegundos
function ticker ():void {
	
	setInterval( () => {
		
		var rectPlayer = {
			x: parseInt(player.body.style.right),
			y: parseInt(player.body.style.bottom),
			w: parseInt(player.body.style.width),
			h: parseInt(player.body.style.height),
			e: player.body
		}
		
		var enemies = playArea.getElementsByClassName('enemy');
		if(enemies.length > 0)
			for (var i = 0; i < enemies.length; i++) {
				var elEnemy: any = enemies[i];
				var rect1 = {
					x: parseInt(elEnemy.style.right),
					y: parseInt(elEnemy.style.bottom),
					w: parseInt(elEnemy.style.width),
					h: parseInt(elEnemy.style.height),
					e: elEnemy
				}

				if( detectCollition(rect1, rectPlayer) ){
					console.log( "POW!" );
					player.dead();
				}
			}
			
		var obstacles = playArea.getElementsByClassName('obstacle');
		if(obstacles.length > 0){
			for (var i = 0; i < obstacles.length; i++) {
				var elObstacle: any = obstacles[i];
				var rect1 = {
					x: parseInt(elObstacle.style.right),
					y: parseInt(elObstacle.style.bottom),
					w: parseInt(elObstacle.style.width),
					h: parseInt(elObstacle.style.height),
					e: elObstacle
				}
				
				if( !player.isDead && detectCollition(rect1, rectPlayer) ) {
					console.log( "PAM!" );
					player.dead();
				}
			
				var bullets = playArea.getElementsByClassName('bullet');
				if(bullets.length > 0){
					for (var i = 0; i < bullets.length; i++) {
						var elBullet: any = bullets[i];
						var rect2 = {
							x: parseInt(elBullet.style.right),
							y: parseInt(elBullet.style.bottom),
							w: parseInt(elBullet.style.width),
							h: parseInt(elBullet.style.height),
							e: elBullet
						}
						
						if( detectCollition(rect1, rect2) ) {
							
							console.log( "CRASH!" );
							TweenMax.killTweensOf( rect1.e );
							playArea.removeChild( rect1.e );
							
							TweenMax.killTweensOf( rect2.e );
							playArea.removeChild( rect2.e );
						}
					}
				}
			}
		}
	}, 1 );
}

// Carga un nivel!
function loadLevel ( lvl: number = 0) : boolean {
	
	console.log('Load LVL -> ', lvl -1);
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
