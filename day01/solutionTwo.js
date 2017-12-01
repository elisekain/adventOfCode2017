// read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${sumOppositeNumerals(data)}`);
});

function sumOppositeNumerals(captcha) {
	let savedNums = [];
	let halfwayPoint = captcha.length / 2;

	for (i = 0; i < captcha.length; i++) {
		// If the nums match, num * 2 and add it to savedNums
		if (captcha[i] == captcha[halfwayPoint + i]) savedNums.push(captcha[i] * 2);
	}

	// Add all the savedNums together
	const reducer = (accumulator, currentValue) => (accumulator += Number(currentValue));
	return savedNums.reduce(reducer, 0);
}
