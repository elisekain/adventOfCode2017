// Read the input file and process it line by line
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
	input: fs.createReadStream("./input.txt"),
	crlfDelay: Infinity
});

let validPassphraseCount = 0;

rl.on("line", validatePassphrase);

function validatePassphrase(line) {
	const phrases = line.split(" ");

	// If not a phrase (one word only), not valid
	if (phrases.length < 2) return;

	// If the unique set is not the same length, not valid
	let uniquePhrases = [...new Set(phrases)];
	if (phrases.length !== uniquePhrases.length) return;

	validPassphraseCount++;
}

rl.on("close", function() {
	console.log("Answer: ", validPassphraseCount);
});
