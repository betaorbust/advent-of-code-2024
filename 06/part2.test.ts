import { part2 } from './part2.ts';

const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
	[
		[
			`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
			6,
		],
	];

describe('Day 6, part 2', () => {
	test.each(testCasesPt2)('Input:\n%s\nOutput:\n%s', (input, expected) => {
		expect(part2(input)).toBe(expected);
	});
});
