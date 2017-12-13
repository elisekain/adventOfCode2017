// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: `, pipeConnectors(data));
});

function pipeConnectors(data) {
	const pipes = data.split("\n").map(line =>
		line
			.split(" <-> ")[1]
			.split(", ")
			.map(Number)
	);

	let seen = new Set();
	let groups = 0;

	while (seen.size < pipes.length) {
		let i = 0;
		while (seen.has(i)) i++;
		groups++;
		seen.add(i);
		find_pipes(i);
	}

	function find_pipes(id) {
		const connections = pipes[id];
		for (const c of connections) {
			if (seen.has(c)) continue;
			seen.add(c);
			find_pipes(c);
		}
	}

	return groups;
}
