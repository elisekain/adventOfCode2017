// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${garbageCleanUp(data)}`);
});

function garbageCleanUp(data) {
	let garbageTotal = 0;

	// remove escapes
	let removeEscapes = data.replace(/!./g, "");
	// find all the garbage
	let matches = removeEscapes.match(/<(.*?)>/gi);

	matches.map(function(garbage) {
		garbageTotal += garbage.length - 2;
	});

	return garbageTotal;
}
