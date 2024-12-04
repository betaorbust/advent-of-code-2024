import { part1 } from './part1.ts';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
	[
		[
			`..X...
.SAMX.
.A..A.
XMAS.S
.X....`,
			4,
		],
		[
			`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
			18,
		],
		[`XMAS`, 1],
	];

describe('Day 4, part 1', () => {
	test.each(testCasesPt1)('Input: %s. Output: %s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});
