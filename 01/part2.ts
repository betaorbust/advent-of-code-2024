import { parse } from './part1.ts';

/**
 Part 2
*/
export const part2 = (input: string) => {
	const [a, b] = parse(input);
	if (!a || !b) {
		throw new Error('Invalid input');
	}
	const frequency = b.reduce<Map<number, number>>((acc, curr) => {
		acc.set(curr, (acc.get(curr) || 0) + 1);
		return acc;
	}, new Map());

	return a.reduce<number>((acc, curr) => {
		return acc + (frequency.get(curr) || 0) * curr;
	}, 0);
};
