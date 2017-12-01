// read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`The answer is: ${sumAdjacentNumerals(data)}`);
});

function sumAdjacentNumerals(captcha) {
	let savedNums = [];

	for (i = 0; i < captcha.length; i++) {
		// If the nums match, add it to savedNums
		if (captcha[i] == captcha[i + 1]) savedNums.push(captcha[i]);
	}

	// Add all the savedNums together
	const reducer = (accumulator, currentValue) => (accumulator += Number(currentValue));
	return savedNums.reduce(reducer, 0);
}
