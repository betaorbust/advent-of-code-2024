import {
	Grid,
	GridDirectionWithDiagonals,
	GridEntry,
} from '../lib/junk-drawer.ts';

/**
 Part 1
*/

export const hasWord = (
	board: Grid<string>,
	current: GridEntry<string>,
	word: string,
	direction: GridDirectionWithDiagonals,
): boolean => {
	try {
		if (current.value !== word[0]) {
			return false;
		}
		if (word.length === 1) {
			return true;
		}
		const next = board.move(current, direction).value;
		return hasWord(board, next, word.slice(1), direction);
	} catch {
		return false;
	}
};

export const part1 = (input: string) => {
	const board = new Grid(input.split('\n').map((row) => row.split('')));

	return board
		.map((entry) => {
			if (entry.value !== 'X') {
				return 0;
			}

			return (['N', 'S', 'E', 'W', 'NW', 'NE', 'SW', 'SE'] as const).reduce(
				(acc, direction) => {
					const re = hasWord(board, entry, 'XMAS', direction) ? 1 : 0;
					return acc + re;
				},
				0,
			);
		})
		.flat()
		.reduce((acc, val) => acc + val, 0);
};
