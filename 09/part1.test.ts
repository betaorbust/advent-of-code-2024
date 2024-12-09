import { part1 } from './part1.ts';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
	[
		[`2333133121414131402`, 1928],
		['12345', 60],
	];

describe('Day 9, part 1', () => {
	test.each(testCasesPt1)('Input:\n%s\nOutput:\n%s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});
