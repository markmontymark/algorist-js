
/*	queue.h

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


let QUEUESIZE        = 1000;

/*
#include "item.h"
 */

function queue(){
	if(!(this instanceof queue)){
		return new queue();
	}
	this.q = new Array(QUEUESIZE+1);	/* body of queue */
	this.first = 0;
	this.last = QUEUESIZE-1;
	this.count = 0;
	return this;
}
module.exports = queue;


/*	queue.c

		Implementation of a FIFO queue abstract data type.

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


//#include "queue.h"
//#include "item.h"
//#include "bool.h"

queue.QUEUESIZE = QUEUESIZE;

//queue.init_queue = function(q) {
//};

queue.enqueue = function(q,x) {
	if (q.count >= QUEUESIZE){
		console.log("Warning: queue overflow enqueue x=%d",x);
	}
	else {
		q.last = (q.last+1) % QUEUESIZE;
    //console.log( 'q.last = ',q.last,'for ',x);
		q.q[ q.last ] = x;
		q.count += 1;
	}
}

queue.dequeue = function(q) {
	let x;

	if (q.count <= 0) {
		console.log("Warning: empty queue dequeue.");
	}
	else {
		x = q.q[ q.first ];
		q.first = (q.first+1) % QUEUESIZE;
		q.count = q.count - 1;
	}
	return x;
}

queue.headq = (q) => q.q[q.first]

queue.empty_queue = (q)=> q.count <= 0

queue.print_queue = (q) => {
	let i = q.first;
	while (i !== q.last) {
		console.log("%d ",q.q[i]);
		i = (i+1) % QUEUESIZE;
	}
	console.log("%d ",q.q[i]);
}

