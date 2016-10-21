#!/usr/bin/env node

/*	war.c

	Simulation of the children's card game War

	Read in cards with format value, suit, e.g. 4h
	ranked by orders 23456789TJQKA and cdhs

	by: Steven Skiena
	begun: January 18, 2002
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


//#include <stdio.h>
//#include <math.h>
//#include <stdlib.h>
//#include "bool.h"
//#include "queue.h"

let fs = require('fs');
let queue = require('./lib/queue');

let NGAMES	= 50;
let MAXSTEPS  = 100000;

let NCARDS	= 52;	/* number of cards */
let NSUITS	= 4	;/* number of suits */


//let values = {},
//  suits = {};
//"23456789TJQKA".split('').forEach((item,i)=>values['c'+item]=i);
//"cdhs".split('').forEach((item,i)=>suits['c'+item]=i);;

let values = "23456789TJQKA";
let suits = "cdhs";


/* 	Rank the card with given value and suit.	*/

function rank_card_new(/*char */value, /*char */suit) {
  let v = values['c'+value];
  let s = suits['c'+suit];
  if(v === undefined || v === null || s === undefined || s === null){
    console.log("Warning: bad input value=%d, suit=%d",value.charCodeAt(0),suit.charCodeAt(0));
  }
  else{
    return  (v*NSUITS) + s;
  }
}

function rank_card(value, suit) {
	let i,j;	/* counters */
	for (i=0; i<(NCARDS/NSUITS); i++)
		if (values[i]==value)
			for (j=0; j<NSUITS; j++)
				if (suits[j]==suit){
          //if( ( i*NSUITS + j ) === 17){
          //  console.log( 'value,suit',value,suit,' = ',i*NSUITS + j);
          //}
					return( i*NSUITS + j );
        }

	console.log("Warning: bad input value=%s, suit=%s",value.charCodeAt(0),suit.charCodeAt(0));
}

/*	Return the suit and value of the given card.	 */

function /*char*/ suit(/*int*/ card) {
	//return( suits['c'+(card % NSUITS)] );
	return( suits[card % NSUITS] );
}

function /*char*/ value(/*int*/ card) {
	//return( values['c'+(card/NSUITS)] );
  //console.log( 'value(',card,') = ',values[+((card/NSUITS)|0)],' divy ',(card/NSUITS)|0);
	return( values[(card/NSUITS)|0] );
}


function testcards(){
	let /*int*/ i;				/* counter */
	for (i=0; i<NCARDS; i++)
		console.log(" i=%d card[i]=%s%s rank=%d", i, value(i),
			suit(i), rank_card(value(i),suit(i)) );
}

/************************************************************/

function random_init_decks(a,b) {
	let i;				/* counter */
	let perm = new Array(NCARDS+1);

	for (i=0; i<NCARDS; i=i+1) {
                perm[i] = i;
        }

	random_permutation(perm,NCARDS);

	//queue.init_queue(a);
	//queue.init_queue(b);

	for (i=0; i<NCARDS/2; i=i+1) {
		queue.enqueue(a,perm[2*i]);
		queue.enqueue(b,perm[2*i+1]);
	}

	print_card_queue(a);
	print_card_queue(b);

}

function war(/*queue */a, /*queue */b) {
	let steps=0;			/* step counter */
	let x,y;			/* top cards */
	let /*queue*/ c = queue();			/* cards involved in the war */
	let /*bool*/ inwar;			/* are we involved in a war? */
  let vx,vy;

	inwar = false;
	//queue.init_queue(c);

//console.log("deck counts a=%d b=%d",a.count,b.count);
//console.log("deck",a,b);


	while ((!queue.empty_queue(a)) && (!queue.empty_queue(b) && (steps < MAXSTEPS))) {
//print_card_queue(a);
//print_card_queue(b);
		steps = steps + 1;
		x = queue.dequeue(a);
		y = queue.dequeue(b);
		queue.enqueue(c,x);
		queue.enqueue(c,y);
		if (inwar) {
			inwar = false;
		} else {
      vx = value(x);
      vy = value(y);
      //console.log( 'x,y = ',x,y,'vx,vy = ',vx,vy);

			if (vx > vy)
				clear_queue(c,a);
			else if  (vx < vy)
				clear_queue(c,b);
			else if (vy == vx)
				inwar = true;
		}
		/*console.log("x=%d y=%d |a|=%d |b|=%d \n",x,y,a->count,b->count);*/
	}

/*console.log("deck counts a=%d b=%d\n",a->count,b->count);*/

	if (!queue.empty_queue(a) && queue.empty_queue(b))
		console.log("a wins in %d steps",steps);
	else if (queue.empty_queue(a) && !queue.empty_queue(b))
		console.log("b wins in %d steps",steps);
	else if (!queue.empty_queue(a) && !queue.empty_queue(b))
		console.log("game tied after %d steps, |a|=%d |b|=%d",
			steps,a.count,b.count);
	else
		console.log("a and b tie in %d steps",steps);
}


function print_card_queue(q) {
  let i,j;

  i=q.first;

  while (i !== q.last) {
    /*console.log("%2d ",q->q[i]);*/
    console.log("%s%s ",value(q.q[i]),suit(q.q[i]));
    i = (i+1) % queue.QUEUESIZE;
  }

  console.log("%s",q.q[i]);
  console.log("\n");
}


function clear_queue(/*queue **/a, /*queue */b) {
	/*console.log("war ends with %d cards \n",a->count);*/
	while (!queue.empty_queue(a))
		queue.enqueue(b,queue.dequeue(a));
}

//function old_main(){
//	let a = queue(),b = queue();
//	let /*int*/ i;
//
//	/*testcards();*/
//
//	for (i=1; i<=NGAMES; i++) {
//		random_init_decks(a,b);
//		war(a,b);
//	}
//}


function main() {
	process.stdin.resume();
	process.stdin.setEncoding('ascii');
	let _input = '';
	process.stdin.on('data', function(input) {
		_input += input;
	});

	process.stdin.on('end', function() {
		processData(_input);
	});
}

function getLines(str) {
  let lines = str.split('\n');
	// pop any empty lines off end of lines array
  while (lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}

function processData(input){
	let i,
      decks,
      lines = getLines(input);
	for(i=0; i<lines.length; i+=2){
    decks = [queue(),queue()];			/* player's decks */
		//decks.forEach(queue.init_queue);
    //console.log( 'line vs line','---',lines[i],'---',lines[i+1]);
		lines[i].split(' ').forEach(
      rankSuit=>queue.enqueue(decks[0],rank_card(rankSuit[0],rankSuit[1])));
		lines[i+1].split(' ').forEach(
      rankSuit=>queue.enqueue(decks[1],rank_card(rankSuit[0],rankSuit[1])));
		war(decks[0],decks[1]);
    //process.exit();
	}
}
main();
