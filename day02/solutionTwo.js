// Read the input file and process it line by line
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
	input: fs.createReadStream("./input.txt"),
	crlfDelay: Infinity
});

let savedNums = [];

rl.on("line", calcEvenlyDivisible);

function calcEvenlyDivisible(line) {
	const nums = line.split("\t").map(Number);

	// Find only two numbers divisible by each other
	nums.map(function(num, idx) {
		for (i = 0; i < nums.length; i++) {
			// Skip this loop if checking against itself
			if (i === idx) continue;

			// If numbers are evenly divisible, add result to savedNums & break out of loop
			if (num % nums[i] === 0) {
				savedNums.push(num / nums[i]);
				break;
			}
		}
	});
}

rl.on("close", function() {
	// Reduce the savedDiff array to one number for the checksum
	const reducer = (accumulator, currentValue) => (accumulator += currentValue);
	console.log("Answer: ", savedNums.reduce(reducer, 0));
});
