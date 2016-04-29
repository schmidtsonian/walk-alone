/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="Obstacle.ts" />
/// <reference path="Ticker.ts" />
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

interface iRect {
	
	x: number;
	y: number;
	w: number;
	h: number;
	e: HTMLElement;
}

import Utils = app.Utils;
import Player = app.Player;
import Enemy = app.Enemy;
import Obstacle = app.Obstacle;
import Ticker = app.Ticker;

var player: Player;
var playArea: HTMLElement;
var ticker: Ticker;

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

		if( e.which == 74){
			player.jump();
		}
		e.preventDefault();
	}
	
	ticker = new Ticker( playArea, player );
})();

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
