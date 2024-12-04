import { Grid } from '../lib/junk-drawer.ts';
import { hasWord } from './part1.ts';

/**
 Part 2
*/
export const part2 = (input: string) => {
	const board = new Grid(input.split('\n').map((row) => row.split('')));
	return board
		.map((entry) => {
			if (entry.value !== 'A') {
				return 0;
			}
			try {
				const nwCorner = board.move(entry, 'NW', 1).value;
				const neCorner = board.move(entry, 'NE', 1).value;
				return (hasWord(board, nwCorner, 'MAS', 'SE') ||
					hasWord(board, nwCorner, 'SAM', 'SE')) &&
					(hasWord(board, neCorner, 'MAS', 'SW') ||
						hasWord(board, neCorner, 'SAM', 'SW'))
					? 1
					: 0;
			} catch {
				return 0;
			}
		})
		.flat()
		.reduce<number>((acc, val) => acc + val, 0);
};
