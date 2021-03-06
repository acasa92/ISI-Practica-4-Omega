describe("FireBallSpec", function() {

	var canvas, ctx;
	var SpriteSheetOrig, GameOrig;

	beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
		SpriteSheetOrig = SpriteSheet;
		GameOrig = Game;

	});

	afterEach(function() {
		SpriteSheet = SpriteSheetOrig;
		Game = GameOrig;
	});

	it("FireBallSpec", function() {
		SpriteSheet.map = {fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 } };
		var pm = new PlayerFireball(1,2,1);
		expect(pm.w).toBe(SpriteSheet.map['fireball'].w);
		expect(pm.h).toBe(SpriteSheet.map['fireball'].h);
		expect(pm.x).toBe(1 - SpriteSheet.map['fireball'].w/2);
		expect(pm.y).toBe(2 - SpriteSheet.map['fireball'].h);
		//No compruebo el valor exacto de pm.vy suponiendo 
		//que se puede querer modificar la velocidad
		expect(pm.vy<0).toBe(true);
	});

	it("FireBallSpec.step()", function() {
		var pm = new PlayerFireball(1,1000,1);
		var dummyBoard = { remove: function(obj) {},	
				collide:function(){}
		 };
		pm.board = dummyBoard;
		spyOn(dummyBoard, "remove");
	
		//sin salirse de la pantalla

		pm.step(0.1);
		expect(dummyBoard.remove).not.toHaveBeenCalled();

		//saliendose de la pantalla
		pm.step(10000);
		expect(dummyBoard.remove).toHaveBeenCalledWith(pm);
	});
	
	it("FireBallSpec.draw()", function() {
		var pm = new PlayerFireball(1,2,1);
		SpriteSheet = { draw: function(ctx, name, x, y) {} };
		spyOn(SpriteSheet, "draw");
		pm.draw(ctx);
		expect(SpriteSheet.draw).toHaveBeenCalledWith(ctx,'fireball', pm.x, pm.y, 0);
	});

});
