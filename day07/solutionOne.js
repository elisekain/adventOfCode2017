// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${findBottomProgram(data)}`);
});

function findBottomProgram(data) {
	let bottomProgram,
		names = [],
		children = {},
		parents = {},
		weights = {},
		program = Array.from(data.split("\n"));

	program.map(function(line) {
		let parts = line.match(/^(\S+) \((\d+)\)(?: -> (.*))?/),
			name = parts[1],
			lineChildren = parts[3];

		// add name to list
		names.push(name);

		// add weights to list, using name as key
		if (parts[2]) weights[name] = parts[2];

		// add children to list, using name as key
		if (parts[3]) {
			children[name] = lineChildren;

			// add parent record to list, using child as key
			Array.from(lineChildren.split(", ")).map(function(child) {
				parents[child] = name;
			});
		}
	});

	names.map(function(name) {
		if (!parents[name]) bottomProgram = name;
	});

	return bottomProgram;
}
