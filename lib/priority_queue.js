
/*	priority_queue.h

	Header file for queue implementation

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


//#include "item.h"

let PQ_SIZE = 1000;

function priority_queue(){
  if(!(this instanceof priority_queue)){
    return new priority_queue();
  }
  this.q = new Array(PQ_SIZE+1);
  this.n = 0;
}
module.exports = priority_queue;


/*	priority_queue.c

	Implementation of a heap / priority queue abstract data type.

	by: Steven Skiena
	begun: March 27, 2002
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


//#include "stdio.h"
//#include "priority_queue.h"
//#include "bool.h"


priority_queue.prototype.pq_swap = function(/*int*/ i, /*int*/ j) {
	let temp;			/* placeholder */
	temp = this.q[i];
	this.q[i] = this.q[j];
	this.q[j] = temp;
}

priority_queue.prototype.pq_init = function () {
  this.n = 0;
}


priority_queue.prototype.pq_parent = function(/*int*/ n) {
	return (n === 1) ? -1 : Math.floor(n/2);
}

priority_queue.prototype.pq_young_child = function(/*int*/ n) {
	return 2 * n;
}


priority_queue.prototype.bubble_up = function (/*int*/ p) {
	if (this.pq_parent(p) === -1)	{
    return;	/* at root of heap, no parent */
  }

	if (this.q[this.pq_parent(p)] > this.q[p]) {
		this.pq_swap(p,this.pq_parent(p));
		this.bubble_up(this.pq_parent(p));
	}
}

priority_queue.prototype.bubble_down = function(/*int*/p) {
	let c;				/* child index */
	let i;				/* counter */
	let min_index;		        /* index of lightest child */

	c = this.pq_young_child(p);
	min_index = p;

	for (i=0; i<=1; i++)
		if ((c+i) <= this.n &&
      this.q[min_index] > this.q[c+i]) {
        min_index = c+i;
		}

    if (min_index !== p) {
      this.pq_swap(p,min_index);
      this.bubble_down(min_index);
    }
}



priority_queue.prototype.pq_insert = function (/*item_type*/ x) {
	if (this.n >= PQ_SIZE){
		console.log("Warning: priority queue overflow insert x=%d\n",x);
    return;
  }
	this.n = this.n + 1;
	this.q[ this.n ] = x;
	this.bubble_up(this.n);
}


priority_queue.prototype./*item_type */extract_min = function () {
  let min = -1;			/* minimum value */

  if (this.n <= 0) {
    console.log("Warning: empty priority queue.\n");
  }
  else {
    min = this.q[1];

    this.q[1] = this.q[ this.n ];
    this.n = this.n - 1;
    this.bubble_down(1);
  }
  return min;
}

priority_queue.prototype.empty_pq = function () {
  return this.n <= 0;
}

//priority_queue.prototype.print_pq = function () {
//  for (let i=1; i<=this.n; i++){
//    console.log("%d ",this.q[i]);
//  }
//  console.log("\n");
//}

priority_queue.prototype.make_heap = function ( /*item_type*/ s, /*int */n) {
  let i;                          /* counter */
  this.n = n;
  for (i=0; i<n; i++){
    this.q[i+1] = s[i];
  }

	for (i=this.n; i>=1; i--){
		this.bubble_down(i);
  }
}

priority_queue.prototype.make_heap1 = function (/*item_type */s/*[]*/, /*int*/ n) {
  let i;                          /* counter */

  this.pq_init();
  for (i=0; i<n; i++){
    this.pq_insert( s[i]);
  }
}

