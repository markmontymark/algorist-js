#!/usr/bin/env node


/*	name.c
	Corporate name changing program -- string example

	by:Steven Skiena
	begun: January 28, 2002
	revised: July 3, 2002
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

//#include <stdio.h>
//#include <string.h>
//
let MAXLEN		 = 1001;	/* longest possible string */
let MAXCHANGES =	101;	/* maximum number of name changes */

//typedef char string[MAXLEN];

//string mergers[MAXCHANGES][2];	/* store before/after corporate names */
let mergers = new Array(MAXCHANGES);
let nmergers;			/* the number of different name changes */

let searchReplaceRe = /^\s*"([^"]+)"[^"]*"([^"]+)"/;

function read_changes(/*int*/lines) {
	let i;			/* counter */

	nmergers = Number(lines.shift());
	for (i=0; i<nmergers; i++) {
    let line = lines.shift();
    mergers[i] = getSearchReplace(line);
		/*console.log("%s to %s\n",mergers[i][0], mergers[i][1]);*/
	}
}

function getSearchReplace (line){
  let searchReplaceMatch = line.match(searchReplaceRe);
  //console.log( 'srm ' ,searchReplaceMatch);
  return [searchReplaceMatch[1],searchReplaceMatch[2]];
}

function mmain(lines) {
	let line;		/* input string */
	let /*int */ nlines;		/* number of lines in text */
	let /*int */ i,j;		/* counters */
	let /*int */ pos;		/* position of pattern in string */

	read_changes(lines);
  nlines = Number(lines.shift());
	for (i=0; i<lines.length ; i++) {
		/* read text line */
		j=0;
    line = lines[i];
		for (j=0; j<nmergers; j++){
			while ((pos=line.indexOf(mergers[j][0])) !== -1) {
        line = line.substring(0,pos) + mergers[j][1] + line.substring(pos+mergers[j][0].length);
      }
    }
		console.log(line);
	}
}

inputcb(mmain);
