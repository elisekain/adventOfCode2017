// Read the input file and process it line by line
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
	input: fs.createReadStream("./input.txt"),
	crlfDelay: Infinity
});

let savedDiffs = [];

rl.on("line", calcHiLowDiff);

function calcHiLowDiff(line) {
	const nums = line.split("\t").map(Number);

	const maxNum = Math.max(...nums);
	const minNum = Math.min(...nums);

	savedDiffs.push(maxNum - minNum);
}

rl.on("close", function() {
	// Reduce the savedDiff array to one number for the checksum
	const reducer = (accumulator, currentValue) => (accumulator += currentValue);
	console.log("Answer: ", savedDiffs.reduce(reducer, 0));
});
