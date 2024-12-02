import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
	[
		[
			`3   4
4   3
2   5
1   3
3   9
3   3`,
			11,
		],
	];

describe('Day 1, part 1', () => {
	test.each(testCasesPt1)('Input: %s. Output: %s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});

const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
	[
		[
			`3   4
4   3
2   5
1   3
3   9
3   3`,
			31,
		],
	];

describe('Day 1, part 2', () => {
	test.each(testCasesPt2)('Input: %s. Output: %s', (input, expected) => {
		expect(part2(input)).toBe(expected);
	});
});
