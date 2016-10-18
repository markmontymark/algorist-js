#!/usr/bin/env node

/*	distance.c

	Compute Euclidian distances

	by: Steven Skiena
*/

/*
Copyright 2003 by Steven S. Skiena; all rights reserved.

Permission is granted for use in non-commerical applications
provided this copyright notice remains intact and unchanged.

This program appears in my book:

"Programming Challenges: The Programming Contest Training Manual"
by Steven Skiena and Miguel Revilla, Springer-Verlag, New York 2003.

See our website www.programming-challenges.com for additional information.

This book can be ordered from Amazon.com at

http://www.amazon.com/exec/obidos/ASIN/0387001638/thealgorithmrepo/

*/

/* myNamespace.round provided by

[About MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#PHP-Like_rounding_Method) by Mozilla Contributors is licensed under [CC-BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/)
.
*/

var myNamespace = {};

myNamespace.round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

let DIMENSION	= 3;

function main(){
	let a=[6,2,3];
	let b=[6,3,4];
	console.log("distance = %d",myNamespace.round(distance(a,b),6));
}

function distance(a, b) {
	let i;
	let d=0.0;

	for (i=0; i<DIMENSION; i++){
		d = d + (a[i]-b[i]) * (a[i]-b[i]);
  }

	return( Math.sqrt(d) );
}

main();
