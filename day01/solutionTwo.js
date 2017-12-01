// read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`The answer is: ${sumOppositeNumerals(data)}`);
});

function sumOppositeNumerals(captcha) {
	let savedNums = [];
	let halfwayPoint = captcha.length / 2;

	for (i = 0; i < captcha.length; i++) {
		let point = halfwayPoint + i;

		// Cycle around to beginning if needed
		if (point > captcha.length) point -= captcha.length;

		// If the nums match, add it to savedNums
		if (captcha[i] == captcha[point]) savedNums.push(captcha[i]);
	}

	// Add all the savedNums together
	const reducer = (accumulator, currentValue) => (accumulator += Number(currentValue));
	return savedNums.reduce(reducer, 0);
}
