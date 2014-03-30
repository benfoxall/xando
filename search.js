

/*
+100 for EACH 3-in-a-line for computer.
+10 for EACH 2-in-a-line (with a empty cell) for computer.
+1 for EACH 1-in-a-line (with two empty cells) for computer.
*/

function minimax_evaluate_row(row){
	if((Math.min.apply(Math, row) === -1) && (Math.max.apply(Math, row) === 1)) return 0
	switch (row[0] + row[1] + row[2]){
		case 3: return 100;
		case -3: return -100;
		case 2: return 10;
		case -2: return -10;
		case 1: return 1;
		case -1: return -1;
	}
	return 0;
}

function minimax_evaluate(board){

	var 
	h1 = minimax_evaluate_row([board[0],board[1],board[2]]);
	h2 = minimax_evaluate_row([board[3],board[4],board[5]]);
	h3 = minimax_evaluate_row([board[6],board[7],board[8]]);
	v1 = minimax_evaluate_row([board[0],board[3],board[6]]);
	v2 = minimax_evaluate_row([board[1],board[4],board[7]]);
	v3 = minimax_evaluate_row([board[2],board[5],board[8]]);
	d1 = minimax_evaluate_row([board[0],board[4],board[8]]);
	d2 = minimax_evaluate_row([board[2],board[4],board[6]]);

	return h1+h2+h3+v1+v2+v3+d1+d2;

}


var board = [
	1,0,0,
	0,0,0,
	0,0,0
];

function expand(state, play){

	/* "alternative code for below"
	return state
		.filter(function(i){
			return i === 0;
		})
		.map(function(v,i){
			var next = state.slice();
			next[i] = play;
			return next;
		})
	*/

	var options = [];
	for (var i = 0; i < state.length; i++) {
		if(state[i] === 0){
			var next = state.slice();
			next[i] = play;
			options.push(next)
		}
	};
	return options;
}

function minimax(state, player, depth){

	if(player === 'X'){
		// maximise

		var max,
			max_value = -Infinity;

		expand(state,1)
		.forEach(function(item){
			var score = minimax_evaluate(item, player);
			if(score > max_value){
				max_value = score;
				max = item;
			}
			console.log(item, "->", minimax_evaluate(item, player));
		})

		return max;

	} else if(player === 'O'){
		//minimise

		var max,
			max_value = Infinity;

		expand(state,-1)
		.forEach(function(item){
			var score = minimax_evaluate(item, player);
			if(score < max_value){
				max_value = score;
				max = item;
			}
			console.log(item, "->", minimax_evaluate(item, player));
		})

		return max;

	} else {
		throw "no player"
	}



	// if(depth<1) return state;

	// var max,
	// 	max_value = -Infinity;

	// expand(state,1)
	// .forEach(function(item){
	// 	var score = minimax_evaluate(item, player);
	// 	if(score > max_value){
	// 		max_value = score;
	// 		max = item;
	// 	}
	// 	console.log(item, "->", minimax_evaluate(item, player));
	// })

	// return max;
}

// minimax(board, 'X', 2)