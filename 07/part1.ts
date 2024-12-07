/**
 Part 1
*/

// Parse the input file out
export const parse = (input: string) => {
	return input.split('\n').map((line) => {
		const [target, ...numbers] = line
			.split(/[^\d]+/g)
			.map(Number)
			.filter((n) => !Number.isNaN(n));
		if (!target || numbers.length === 0) {
			throw new Error('parsing error');
		}
		return { target, numbers };
	});
};

// An operator just takes two numbers and returns a number
type Operator = (a: number, b: number) => number;

// The workhorse, shared between the parts
export const findTargets = (
	target: number,
	[first, ...otherNumbers]: number[],
	operators: Operator[],
) => {
	if (!first) {
		throw new Error('no first');
	}
	let currentValues = [first];
	// March over the rest of the number array
	for (const value of otherNumbers) {
		const nextValues = [];
		for (const current of currentValues) {
			// Only bother to keep this branch if we haven't gone past the target
			if (current <= target) {
				for (const op of operators) {
					// Push the result of the operation onto the nextValues array
					nextValues.push(op(current, value));
				}
			}
		}
		// Move the nextValues array to the currentValues array so we loop over
		// them the next round.
		currentValues = nextValues;
	}
	return currentValues.find((result) => result === target) ?? 0;
};

// Operators for part 1
export const operators: Operator[] = [
	// add
	(a, b) => a + b,
	// multiply
	(a, b) => a * b,
];

export const part1 = (input: string) =>
	parse(input)
		.map(({ target, numbers }) => findTargets(target, numbers, operators))
		.reduce((acc, result) => acc + result, 0);
