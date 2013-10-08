//Michael Doescher
//October 3, 2013
//This program tests if a point is within a circle in a 2D plane defined by three points.
//Input = an array of three points - a point is an array of x,y coordinates, and a point to test
//Output = 1 if the point is in the circle or 0 if the point is on the circle (within 10^-6) and -1 if the point is outside the circle

module.exports = function(threePoints, point) {
	if (!isInputOk(threePoints)) {return null;}
	
	var center = circumcenter(threePoints);
	var r = distance(threePoints[0], center);
	var d = distance(center, point);
	
	if ((d-r) > 0.000001) {
		return -1;
	}
	else if ((r-d) > 0.000001) {
		return 1;
	}
	else {
		return 0;
	}
}

function circumcenter(threePoints) {
	// algorithm from farin and hansford's Practical Linear Algegra: a Geometry Toolbox page 146.
	var p1 = threePoints[0];
	var p2 = threePoints[1];
	var p3 = threePoints[2];
	
	var d1 = dotProduct(vSubtract(p2,p1), vSubtract(p3,p1));
	var d2 = dotProduct(vSubtract(p1,p2), vSubtract(p3,p2));
	var d3 = dotProduct(vSubtract(p1,p3), vSubtract(p2,p3));
	var D = 2*(d1*d2 + d2*d3 + d3*d1);
	
	//Barycentric Coordinates
	var cc1 = d1*(d2+d3) / D;
	var cc2 = d2*(d1+d3) / D;
	var cc3 = d3*(d1+d2) / D;
	
	var center = new Array(2);
	center[0] = cc1*p1[0] + cc2*p2[0] + cc3*p3[0];
	center[1] = cc1*p1[1] + cc2*p2[1] + cc3*p3[1];
	
	return center;
}

function dotProduct(v, w) {
	var r = v[0]*w[0] + v[1]*w[1];
	return r;

}

function vSubtract(v1, v2) {
	var v = new Array(2);
	v[0] = v1[0] - v2[0];
	v[1] = v1[1] - v2[1];
	return v;
}

function distance(p1, p2) {
	var d = (p1[0]-p2[0]) * (p1[0]-p2[0]) + (p1[1]-p2[1]) * (p1[1]-p2[1]);
	d = Math.sqrt(d);
	return d;
}

function isInputOk(a) {
	var p1 = a[0];
	var p2 = a[1];
	var p3 = a[2];
	
	
	// two of the points are the same
	if (p1[0] == p2[0] && p1[1] == p2[1]) return false;
	if (p2[0] == p3[0] && p2[1] == p3[1]) return false;
	if (p3[0] == p1[0] && p3[1] == p1[1]) return false;
	
	// points are collinear
	var lr = require("left-right")
	if (lr(p1, p2, p3) == 0) return false;
	return true;
	

}