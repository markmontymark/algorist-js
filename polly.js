#!/usr/bin/env node

/*	polly.c

	Rank the desirability of suitors -- sorting example.

	by: Steven Skiena
	begun: February 5, 2002
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

let inputcb = require('./lib/inputcb');

let NAMELENGTH	= 30		/* maximum length of name */
let BESTHEIGHT	= 180		/* best height in centimeters */
let BESTWEIGHT	= 75		/* best weight in kilograms */

//#include <stdio.h>
//#include <string.h>
//
function suitor(){
  if(!(this instanceof suitor)){
    return new suitor();
  }
	this.first=null;		/* suitor's first name */
	this.last=null;          /* suitor's last name */
	this.height;			/* suitor's height */
	this.weight;			/* suitor's weight */
}


let suitors = [];

function read_suitors(lines) {
	let /*char */first, last;

  lines.forEach( line => {
    let s = suitor();
    let words = line.split(/\s+/);
    s.first = words[0];
    s.last  = words[1];
    s.height =  +(words[2]);
    s.weight =  +(words[3]);

		s.height = Math.abs(s.height - BESTHEIGHT);
    s.weight = (s.weight > BESTWEIGHT) ?
        (s.weight - BESTWEIGHT) : (-1 * s.weight);
    suitors.push(s);
	});
}


function main(lines) {
	read_suitors(lines);
	suitors.sort(suitor_compare);
	for (let i=0; i<suitors.length; i++){
		console.log("%s, %s",suitors[i].last, suitors[i].first);
  }
}

function suitor_compare(/*suitor */a, /*suitor */b) {
	let result = 0;			/* result of comparsion */

  if (a.height < b.height) {return -1;}
  if (a.height > b.height) {return 1;}

	if (a.weight < b.weight) {return -1;}
	if (a.weight > b.weight) {return 1;}

	if ((result=((a.last < b.last) ? -1 : +(a.last > b.last))) != 0) {
    return result;
  }
  return (a.first < b.first) ? -1 : +(a.first > b.first);
}

inputcb(main);
