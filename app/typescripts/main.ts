// /// <reference path="definitions/greensock/greensock.d.ts" />
// /// <reference path="definitions/jquery/jquery.d.ts" />
/// <reference path="Player.ts" />

import Player = app.Player;
var player: Player;
(function () {
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
