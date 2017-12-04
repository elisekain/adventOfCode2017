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
	let phrases = line.split(" ");

	// If not a phrase (one word only), not valid
	if (phrases.length < 2) return;

	// Alpha sort each word
	phrases = phrases.map(function(phrase) {
		let phraseArr = phrase.split("");
		phraseArr.sort();
		return phraseArr.join("");
	});

	// If the unique set is not the same length, not valid
	let uniquePhrases = [...new Set(phrases)];
	if (phrases.length !== uniquePhrases.length) return;

	validPassphraseCount++;
}

rl.on("close", function() {
	console.log("Answer: ", validPassphraseCount);
});
