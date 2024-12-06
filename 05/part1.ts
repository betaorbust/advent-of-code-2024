/**
 Part 1
*/

export const parse = (input: string) => {
	const [ruleStr, updateStr] = input.split('\n\n');
	if (!ruleStr || !updateStr) {
		throw new Error('Invalid input');
	}
	return {
		rules: ruleStr
			.split('\n')
			.map((rule) => rule.split('|').map(Number))
			.map(([a, b]) => [a, b] as [number, number]),
		updates: updateStr.split('\n').map((line) => line.split(',').map(Number)),
	};
};

export const getMiddlesReducer = (acc: number, update: number[]) => {
	const middle = update[Math.floor(update.length / 2)];
	if (middle === undefined) {
		throw new Error('Invalid length');
	}
	return acc + middle;
};

export const filterGoodOnes = (
	rules: [number, number][],
	updates: number[][],
) =>
	updates.filter((update) =>
		rules
			.filter(([r1, r2]) => update.includes(r1) && update.includes(r2))
			.every(([r1, r2]) => update.indexOf(r1) < update.indexOf(r2)),
	);

export const part1 = (input: string) => {
	const { rules, updates } = parse(input);
	return filterGoodOnes(rules, updates).reduce(getMiddlesReducer, 0);
};
