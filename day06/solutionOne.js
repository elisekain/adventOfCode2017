// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${allocateMemory(data)}`);
});

function allocateMemory(data) {
	// Create bank
	let bank = Array.from(data.split("\t"));
	bank = bank.map(block => parseInt(block));

	// Find the last index, set up a bank state monitor and lengthOfLoop
	const lastBankIdx = bank.length - 1;
	let bankStates = [JSON.stringify(bank)],
		lengthOfLoop;

	while (true) {
		// Find max number in the array
		let memToReallocate = Math.max(...bank);

		// Grab first instance of that number
		let maxNumIdx = bank.indexOf(memToReallocate);

		// Set its value to zero
		bank[maxNumIdx] = 0;

		// Then reallocate the memory
		let currentIdx = maxNumIdx;
		while (memToReallocate) {
			currentIdx = currentIdx === lastBankIdx ? 0 : currentIdx + 1;
			bank[currentIdx] = bank[currentIdx] + 1;
			memToReallocate--;
		}

		// Check to see if that configuration has been seen before
		let newBankState = JSON.stringify(bank);
		if (~bankStates.indexOf(newBankState)) {
			lengthOfLoop = bankStates.length - bankStates.indexOf(newBankState);
			break;
		} else {
			bankStates.push(newBankState);
		}
	}

	return lengthOfLoop;
}
