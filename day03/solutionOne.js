const stepsToOne = num => {
	// Find closest square root
	var root = Math.ceil(Math.sqrt(num));

	// Find the nearest odd square root
	var oddSqRoot = root % 2 === 0 ? root + 1 : root;

	// Steps to center from axis
	var stepsToReachCenterFromAxis = (oddSqRoot - 1) / 2;

	// Next, count the distance from the square to your input
	const cycle = num - (oddSqRoot - 2) ** 2;
	const innerOffset = cycle % (oddSqRoot - 1);

	// Add vertical distance and horizontal distance together.
	return stepsToReachCenterFromAxis + Math.abs(innerOffset - stepsToReachCenterFromAxis);
};

console.log("Answer: ", stepsToOne(368078));
