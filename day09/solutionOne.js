// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${garbageCleanUp(data)}`);
});

function garbageCleanUp(data) {
	// remove escapes
	let removeEscapes = data.replace(/!./g, "");
	// remove garbage
	let cleanData = removeEscapes.replace(/<.*?>/g, "");

	console.log("garbageFree", cleanData);

	let value = 0,
		total = 0;

	for (i = 0; i < cleanData.length; i++) {
		if (cleanData[i] === "{") value++;
		else if (cleanData[i] === "}") total += value--;
	}

	return total;
}
