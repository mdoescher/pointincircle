"use strict"

var pic = require("../pointincircle.js")

require("tape")(function(t) {

	var p1 = [0, 0];
	var p2 = [1, 0];
	var p3 = [0, 1];
	
	var threePoints = [p1, p2, p3];

	t.same(pic(threePoints, [1,1]), 0);
	t.same(pic(threePoints, [0.5,0.5]), 1); 
	t.same(pic(threePoints, [100, 100]), -1);
	
	// points are the same
	threePoints = [p1, p1, p3];
	t.same(pic(threePoints, [1,1]), null);
	
	threePoints = [p1, p2, [2,0]];
	t.same(pic(threePoints, [1,1]), null);
	
	t.end();
	

})

