// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${followJumpInstructions(data)}`);
});

function followJumpInstructions(data) {
	let stepCount = 0,
		maze = Array.from(data.split("\n")),
		currentPositionIndex = 0;

	while (true) {
		let move = Number.parseInt(maze[currentPositionIndex]);

		// increment stepCount
		stepCount++;

		// increment current position integer
		maze[currentPositionIndex]++;

		// make the move
		currentPositionIndex += move;

		// if next item is undefined, break the loop
		if (maze[currentPositionIndex] === undefined) break;
	}

	return stepCount;
}
