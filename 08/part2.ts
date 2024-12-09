import { Vector, getAllPairs } from '../lib/junk-drawer.ts';
import { parse } from './part1.ts';

/**
 Part 2
*/
export const part2 = (input: string) => {
	const { grid: startingGrid, unique } = parse(input);

	// Make up an empty grid
	const antinodeGrid = startingGrid.clone();
	antinodeGrid.forEach((entry) => (entry.value = '.'));

	// Helper function to set an antinode
	const setAntinode = (row: number, column: number) => {
		antinodeGrid.getAddress(row, column).value = 'A';
	};

	[...unique].forEach((char) => {
		const entriesWithChar = startingGrid.findAll(
			(entry) => entry.value === char,
		);

		getAllPairs(entriesWithChar).forEach(([t1, t2]) => {
			const t1V = new Vector(t1.row, t1.column);
			const t2V = new Vector(t2.row, t2.column);
			const betweenV = t1V.subtract(t2V);

			let count = 0;
			while (true) {
				const offT1 = t1V.add(betweenV.scalarMultiply(count));
				try {
					setAntinode(offT1.x, offT1.y);
				} catch {
					// above will throw when we go out of bounds
					// and that's when we're done
					break;
				}
				count += 1;
			}

			count = 0;
			while (true) {
				const offT2 = t2V.subtract(betweenV.scalarMultiply(count));
				try {
					setAntinode(offT2.x, offT2.y);
				} catch {
					// above will throw when we go out of bounds
					// and that's when we're done
					break;
				}
				count += 1;
			}
		});
	});

	return antinodeGrid
		.map((entry) => entry.value)
		.flat()
		.filter((char) => char === 'A').length;
};
