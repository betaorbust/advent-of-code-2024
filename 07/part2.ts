import { findTargets, parse, operators as pt1Operators } from './part1.ts';

/**
 Part 2
*/

// Adding a concatenation operator... with concatenation.
const operators = pt1Operators.concat((a, b) => Number.parseInt(`${a}${b}`));

export const part2 = (input: string) =>
	parse(input)
		.map(({ target, numbers }) => findTargets(target, numbers, operators))
		.reduce((acc, result) => acc + result, 0);
