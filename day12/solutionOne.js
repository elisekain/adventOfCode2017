// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: `, pipeConnectors(data).size);
});

function pipeConnectors(data) {
	let program = Array.from(data.split("\n")),
		programMap = {};

	program.map(function(line) {
		let parts = line.match(/^(\d+) <-> (.+)/);
		if (!parts) return "There was a regex parsing error.";

		let name = parts[1];
		let items = [...parts[2].split(", ")];

		// if the program can only talk to itself, ignore it
		if (items.length < 2 && name === items[0]) return;

		programMap[name] = items;
	});

	function getConnectedPipes(pipes, pipe, currentSet = new Set()) {
		currentSet.add(pipe);
		for (let p of pipes[pipe].filter(p => !currentSet.has(p))) {
			getConnectedPipes(pipes, p, currentSet);
		}
		return currentSet;
	}

	return getConnectedPipes(programMap, "0");
}
