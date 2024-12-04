import { part1 } from './part1.ts';

export const part2 = (input: string) => {
	return part1(input.replaceAll(/don't\(\).+?do\(\)/g, ''));
};
