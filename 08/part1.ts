/**
 Part 1
*/
import { Grid, Vector, getAllPairs } from '../lib/junk-drawer.ts';

export function parse(input: string) {
	return {
		grid: new Grid(input.split('\n').map((line) => line.split(''))),
		unique: new Set([...input].filter((char) => char !== '\n' && char !== '.')),
	};
}
export const part1 = (input: string) => {
	const { grid: startingGrid, unique } = parse(input);
	const antinodeGrid = startingGrid.clone();
	// Set it to be an empty grid
	antinodeGrid.forEach((entry) => (entry.value = '.'));

	[...unique].forEach((char) => {
		const entriesWithChar = startingGrid.findAll(
			(entry) => entry.value === char,
		);

		getAllPairs(entriesWithChar).forEach(([t1, t2]) => {
			const t1V = new Vector(t1.column, t1.row);
			const t2V = new Vector(t2.column, t2.row);
			const betweenV = t1V.subtract(t2V);
			const offT1 = t1V.add(betweenV);
			const offT2 = t2V.subtract(betweenV);
			try {
				antinodeGrid.getAddress(offT1.x, offT1.y).value = 'A';
			} catch {
				// Do nothing. We expect this to throw for out of range errors
			}
			try {
				antinodeGrid.getAddress(offT2.x, offT2.y).value = 'A';
			} catch {
				// Do nothing. We expect this to throw for out of range errors
			}
		});
	});
	return antinodeGrid
		.map((entry) => entry.value)
		.flat()
		.filter((char) => char === 'A').length;
};
