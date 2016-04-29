/// <reference path="Player.ts" />
/// <reference path="Ticker.ts" />
/// <reference path="LevelSelector.ts" />
/// <reference path="Utils.ts" />

import Utils = app.Utils;
import Player = app.Player;
import Ticker = app.Ticker;
import LevelSelector = app.LevelSelector;

var player: Player;
var ticker: Ticker;
var levelSelector: LevelSelector;

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

		if( e.which == 74){
			player.jump();
		}
		e.preventDefault();
	}
	
	ticker = new Ticker( playArea, player );
	levelSelector = new LevelSelector( playArea );
})();
