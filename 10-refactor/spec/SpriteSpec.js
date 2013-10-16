describe("SpriteSpec", function() {

	var canvas, ctx;

	beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
	});

	it("Sprite.setup()", function() {
		var sp = new Sprite();
		sp.merge = function(props){};
		SpriteSheet = {map: {'dummySprite': {w:1, h:2} } };
		spyOn(sp, "merge");
		sp.setup('dummySprite', 'props');
		expect(sp.sprite).toBe("dummySprite");
		expect(sp.merge).toHaveBeenCalledWith("props");
		expect(sp.frame).toBe(0);
		expect(sp.w).toBe(SpriteSheet.map['dummySprite'].w);
		expect(sp.h).toBe(SpriteSheet.map['dummySprite'].h);
	});


});
