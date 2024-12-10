import { findNine, parse } from './part1.ts';

/**
 Part 2
*/
export const part2 = (input: string) => {
	const map = parse(input);
	return (
		map
			.findAll((el) => el.value === 0)
			.map((s) => findNine(map, s))
			// This time,  just count up how many steps are in each path
			.reduce((acc, current) => acc + current.length, 0)
	);
};
