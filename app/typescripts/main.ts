// /// <reference path="definitions/greensock/greensock.d.ts" />
// /// <reference path="definitions/jquery/jquery.d.ts" />
// /// <reference path="index/IndexApp.ts" />
/// <reference path="Player.ts" />

import Player = app.Player;
var player: Player;
(function () {
	player = new Player('js-player');


	// Controles
	document.body.onkeypress = (e) => {
		switch (e.which) {
			case 115: player.jump(); break;
			case 32:  player.shoot(); break;

			default: return;
		}
		e.preventDefault();
	}
})();
