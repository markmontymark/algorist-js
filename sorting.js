#!/usr/bin/env node


/*	sorting.c
	Implementations of primary sorting algorithms

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

let queue = require('./lib/queue');
let priority_queue = require('./lib/priority_queue');

//#include <stdio.h>
//#include "bool.h"
//#include <math.h>
//#include <stdlib.h>
//#include "priority_queue.h"
//#include "queue.h"

let NELEM	 = 100	;	/* size of test arrays */
let LESS_THAN = 	-1;
let EQUAL_TO	 = 0;
let GREATER_THAN = 	1;

function compare( a, b) {
	return (a < b) ? LESS_THAN :
         (a > b) ? GREATER_THAN : EQUAL_TO;
}

/*	Swap the ith and jth elements of array s.	*/

function newswap(/*item_type */s/*[]*/, /*let */i, /*let */j) {
	let tmp;		/* placeholder */
	tmp = s[i];
	s[i] = s[j];
	s[j] = tmp;
}

function insertion_sort(/*item_type s[]*/s, n) {
	let i,j;		/* counters */

	for (i=1; i<n; i++) {
		j=i;
		while ((j>0) && (s[j] < s[j-1])) {
			newswap(s,j,j-1);
			j = j-1;
		}
	}
}


function selection_sort(/*item_type s[]*/s, n) {
  let i,j;                /* counters */
  let min;		/* index of minimum */

  for (i=0; i<n; i++) {
    min=i;
    for (j=i+1; j<n; j++){
      if (s[j] < s[min]) {
        min=j;
      }
    }
    newswap(s,i,min);
  }
}

/*	quicksort array s from the index l to index h.	*/

function quicksort(/*item_type s[]*/s, /*int */ l, /*int*/ h) {
	let p;			/* index of partition */

	if ((h-l)>0) {
		p = partition(s,l,h);
		quicksort(s,l,p-1);
		quicksort(s,p+1,h);
	}
}

function partition(/*item_type s[]*/s, /*int*/ l, /*int*/ h) {
	let i;			/* counter */
	let p;			/* pivot element index */
	let firsthigh;		/* divider position for pivot element */

	p = h;
	firsthigh = l;
	for (i=l; i<h; i++){
		if (s[i] < s[p]) {
			newswap(s,i,firsthigh);
			firsthigh ++;
		}
  }
	newswap(s,p,firsthigh);

	return firsthigh;
}


function newheapsort(/*item_type s[]*/s, /*int*/ n) {
  let i;			/* counters */
	let q = new priority_queue();	/* heap for heapsort */

	q.make_heap1(s,n);

	for (i=0; i<n; i++){
		s[i] = q.extract_min();
  }
}


function binary_search(/*item_type s[]*/s, /*item_type */key, /*int*/ low, /*int*/ high) {
	let middle;			/* index of middle element */

	if (low > high) return -1;	/* key not found */

	middle = Math.floor( (low+high)/2);

	if (s[middle] == key) {
    return middle;
  }

	if (s[middle] > key){
		return( binary_search(s,key,low,middle-1) );
  }
  return(binary_search(s,key,middle+1,high) );
}

function newmerge(/*item_type s[]*/s, /*int*/ low, /*int*/ middle, /*int*/ high) {
	let i;			/* counter */
	let buffer1 = queue(), buffer2 = queue(); /* buffers to hold elements for merging */

	//queue.init_queue(buffer1);
	//queue.init_queue(buffer2);

	for (i=low; i<=middle; i++) {
    queue.enqueue(buffer1,s[i]);
  }
	for (i=middle+1; i<=high; i++) {
    queue.enqueue(buffer2,s[i]);
  }

	i = low;
	while (!(queue.empty_queue(buffer1) || queue.empty_queue(buffer2))) {
		if (queue.headq(buffer1) <= queue.headq(buffer2)){
			s[i++] = queue.dequeue(buffer1);
    }
		else{
			s[i++] = queue.dequeue(buffer2);
    }
	}

	while (!queue.empty_queue(buffer1)) s[i++] = queue.dequeue(buffer1);
	while (!queue.empty_queue(buffer2)) s[i++] = queue.dequeue(buffer2);
}

function newmergesort(/*item_type s[]*/s, /*int*/ low, /*int*/ high) {
	let i;			/* counter */
	let middle;		/* index of middle element */

	if (low < high) {
		middle = (low+high)/2;
		newmergesort(s,low,middle);
		newmergesort(s,middle+1,high);
		newmerge(s, low, middle, high);
	}
}

function random_permutation(arr){
  let max = arr.length - 1;
  for(let i=0;i<max;i++){
    let newa = Math.floor(Math.random()*max);
    let newb = Math.floor(Math.random()*max);
    newswap(arr,newa,newb);
  }
}



function main() {
	let s = new Array(NELEM);
	let n;
	let i,j;			/* counters */

	for (i=0; i<NELEM; i++) {
    s[i] = NELEM-i;
  }
	random_permutation(s);

	insertion_sort(s,NELEM);

        console.log("\n\nInsertion sort: ");
        console.log(s.map(String).join(' ') + ' ');
        for (i=0; i<NELEM; i++) {
          s[i] = NELEM-i;
        }
        random_permutation(s,NELEM);


	selection_sort(s,NELEM);

	console.log("\nSelection sort: ");
        console.log(s.map(String).join(' ') + ' ');
        for (i=0; i<NELEM; i++) {
          s[i] = NELEM-i;
        }
        random_permutation(s,NELEM);

	quicksort(s,0,NELEM-1);

	console.log("\nQuicksort: ");
  console.log(s.map(String).join(' ') + ' ');

	for (i=0; i<NELEM; i++) {
    s[i] = NELEM-i;
  }
        random_permutation(s,NELEM);

	newheapsort(s,NELEM);

	console.log("\nHeapsort sort: ");
  console.log(s.map(String).join(' ') + ' ');


}
main();
