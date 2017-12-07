// Read the input file and process it
fs = require("fs");

fs.readFile("./input.txt", "utf8", function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(`Answer: ${findCorrectedOutlierVal(data)}`);
});

function findCorrectedOutlierVal(data) {
	const reducer = (accumulator, currentValue) => (accumulator += currentValue);

	let bottomProgram,
		newOutlierVal,
		names = [],
		children = {},
		parents = {},
		weights = {},
		program = Array.from(data.split("\n"));

	program.map(function(line) {
		let parts = line.match(/^(\S+) \((\d+)\)(?: -> (.*))?/),
			name = parts[1],
			lineChildren = parts[3] ? Array.from(parts[3].split(", ")) : null;

		// add name to list
		names.push(name);

		// add weights to list, using name as key
		if (parts[2]) weights[name] = Number(parts[2]);

		// add children to list, using name as key
		if (lineChildren) {
			children[name] = lineChildren;

			// add parent record to list, using child as key
			lineChildren.map(function(child) {
				parents[child] = name;
			});
		}
	});

	names.map(function(name) {
		if (!parents[name]) bottomProgram = name;
	});

	weights[bottomProgram] + getChildrenWeights(bottomProgram);

	return newOutlierVal;

	// Add chidren weights recursively through tree
	function getChildrenWeights(parent) {
		let childrenObjectMap = {};

		let childrenWeights = children[parent].map(function(child) {
			if (children[child]) {
				childrenObjectMap[child] = weights[child] + getChildrenWeights(child);
				return weights[child] + getChildrenWeights(child);
			} else {
				return weights[child];
			}
		});

		// find group with wrong item
		let childrenDiscrepency = [...new Set(childrenWeights)];
		if (!newOutlierVal && childrenDiscrepency.length > 1) {
			newOutlierVal = findAndCorrectOutlier(childrenWeights, childrenDiscrepency);
		}

		return childrenWeights.reduce(reducer, 0);

		function findAndCorrectOutlier(cw, disc) {
			let counts = {},
				offNum,
				offWeightChild;

			// find outlier
			for (var i = 0; i < cw.length; i++) {
				var num = cw[i];
				counts[num] = counts[num] ? counts[num] + 1 : 1;
			}

			disc.map(function(num) {
				if (counts[num] < 2) offNum = num;
			});

			children[parent].map(function(childName) {
				if (childrenObjectMap[childName] === offNum) {
					offWeightChild = childName;
				}
			});

			// find outlier value
			let offWeightChildVal = weights[offWeightChild];

			// find diff between outlier and norm values
			let diff = disc[0] - disc[1];

			// create new outlier value
			return offWeightChildVal - diff;
		}
	}
}
