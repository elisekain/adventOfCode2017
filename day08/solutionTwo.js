// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${followInstructions(data)}`);
});

function followInstructions(data) {
	let program = Array.from(data.split("\n")),
		registerMap = {},
		maxNumStored = 0;

	program.map(function(line) {
		let parts = line.match(/^(\w+) (inc|dec) (\S+) (?:if) (\w+) ((\S+) (\S+))/);
		if (!parts) return "There was a regex parsing error.";

		let instruction = {
			target: parts[1],
			dir: parts[2],
			amount: Number(parts[3])
		};

		let evalStatement = {
			item: parts[4],
			condition: parts[5]
		};

		// Add items if never been seen before
		if (!registerMap[evalStatement.item]) registerMap[evalStatement.item] = 0;
		if (!registerMap[instruction.target]) registerMap[instruction.target] = 0;

		// if conditional passes, inc/dec target item by amount specified
		if (eval(`${registerMap[evalStatement.item]} ${evalStatement.condition}`)) {
			registerMap[instruction.target] =
				instruction.dir === "inc"
					? registerMap[instruction.target] + instruction.amount
					: registerMap[instruction.target] - instruction.amount;
		}

		if (registerMap[instruction.target] > maxNumStored)
			maxNumStored = registerMap[instruction.target];
	});

	// return largest number stored during process
	return maxNumStored;
}
