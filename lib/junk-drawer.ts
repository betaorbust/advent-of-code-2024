/**
 * Add two numbers together. I know, this is why people make fun of JS
 * but honestly, these elves do a lot of summing.
 */
export const add = (a: number, b: number): number => a + b;

/**
 * Find the intersection of a list of sets.
 */
export function setIntersection<T>(sets: Set<T>[]): Set<T> {
	const all = new Set(sets.flatMap((set) => [...set]));
	return new Set([...all].filter((x) => sets.every((set) => set.has(x))));
}

/**
 * Partition an array into an array of arrays of size `partitionSize`.
 */
export function arrayPartition<T>(array: T[], partitionSize: number): T[][] {
	const partitions: T[][] = [];
	for (let i = 0; i < array.length; i += partitionSize) {
		partitions.push(array.slice(i, i + partitionSize));
	}
	return partitions;
}

/**
 * Extract matched values from a string
 */
export function extractValues(input: string, match: RegExp) {
	const matches = input.match(match);
	if (!matches) {
		throw new Error(`Could not match "${match}" in "${input}"`);
	}
	return matches.slice(1);
}

/**
 * Cartesian product of multiple arrays
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cartesianProduct = <T extends any[][]>(
	incomingArrays: [...T],
): Array<{ [K in keyof T]: T[K][number] }> =>
	// These are extending from any, but then cast down in the return statement
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	incomingArrays.reduce((a, b) =>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		a.flatMap((d) => b.map((e) => [d, e].flat())),
	);
/**
 * Least common multiple of multiple numbers
 */
export const leastCommonMultiple = (...arr: number[]) => {
	const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
	const lcm = (x: number, y: number) => (x * y) / gcd(x, y);
	return [...arr].reduce((acc, current) => lcm(acc, current));
};

/**
 * For doing 2d spacial manipulation
 */
export class Vector {
	x: number;

	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(other: Vector): Vector {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	subtract(other: Vector): Vector {
		return this.add(other.scalarMultiply(-1));
	}

	scalarMultiply(scalar: number): Vector {
		return new Vector(this.x * scalar, this.y * scalar);
	}

	scalarDivide(scalar: number): Vector {
		return new Vector(this.x / scalar, this.y / scalar);
	}

	magnitude(): number {
		return Math.abs(this.x) + Math.abs(this.y);
	}

	normalize(): Vector {
		return this.scalarDivide(this.magnitude());
	}

	isEqualTo(other: Vector): boolean {
		return this.x === other.x && this.y === other.y;
	}

	toString(): string {
		return `(${this.x}, ${this.y})`;
	}
}

export type GridDirection = 'N' | 'S' | 'E' | 'W';
export type GridDirectionWithDiagonals =
	| GridDirection
	| 'NW'
	| 'SW'
	| 'NE'
	| 'SE';

// Move around a grid. Type safe returns because it throws
// if it goes out of bounds.
export function traverseGrid<T>(
	grid: T[][],
	current: [number, number],
	amount: [GridDirectionWithDiagonals, number],
): { address: [number, number]; value: T } {
	const [directionName, magnitude] = amount;
	const [row, column] = current;
	let [dRow, dColumn] = [0, 0];
	if (directionName.includes('N')) {
		dRow = -1;
	}
	if (directionName.includes('S')) {
		dRow = 1;
	}
	if (directionName.includes('W')) {
		dColumn = -1;
	}
	if (directionName.includes('E')) {
		dColumn = 1;
	}
	const [newRow, newColumn] = [
		row + dRow * magnitude,
		column + dColumn * magnitude,
	];
	if (
		newColumn < 0 ||
		(grid[0] && newColumn >= grid[0].length) ||
		newRow < 0 ||
		newRow >= grid.length ||
		grid[newRow] === undefined ||
		grid[newRow][newColumn] === undefined
	) {
		throw new Error(`Out of bounds: ${newRow}, ${newColumn}`);
	}

	return { address: [newRow, newColumn], value: grid[newRow][newColumn] };
}

// Type safe grid access.
export function getAddressOnGrid<T>(
	grid: T[][],
	[row, column]: [number, number],
): T {
	if (
		row < 0 ||
		row >= grid.length ||
		column < 0 ||
		grid[0] === undefined ||
		column >= grid[0].length
	) {
		throw new Error(`Out of bounds: ${row}, ${column}`);
	}
	const value = grid[row % grid.length]?.[column % grid[0].length];
	if (value === undefined) {
		throw new Error(`Out of bounds: ${row}, ${column}`);
	}
	return value;
}

// Get the neighbors of a cell on a grid.
export function getNeighbors<T>(
	grid: T[][],
	address: [number, number],
	includeDiagonals = true,
): T[] {
	const [row, column] = address;
	const neighbors: T[] = [];
	for (let dRow = -1; dRow <= 1; dRow += 1) {
		for (let dColumn = -1; dColumn <= 1; dColumn += 1) {
			if (
				!(dRow === 0 && dColumn === 0) &&
				(includeDiagonals || dRow === 0 || dColumn === 0)
			) {
				try {
					neighbors.push(
						getAddressOnGrid(grid, [row + dRow, column + dColumn]),
					);
				} catch {
					// Do nothing
				}
			}
		}
	}
	return neighbors;
}

export function getNeighborAddresses<T>(
	grid: T[][],
	[row, column]: [number, number],
	includeDiagonals: boolean,
): [number, number][] {
	const addresses: [number, number][] = [];
	for (let dRow = -1; dRow <= 1; dRow += 1) {
		for (let dColumn = -1; dColumn <= 1; dColumn += 1) {
			const thisRow = row + dRow;
			const thisColumn = column + dColumn;
			const totalColumns = (grid[0]?.length ?? 0) - 1;
			if (totalColumns === -1) {
				throw new Error('Grid has no columns');
			}
			if (
				!(dRow === 0 && dColumn === 0) &&
				!(
					thisRow < 0 ||
					thisRow > grid.length - 1 ||
					thisColumn < 0 ||
					thisColumn > totalColumns
				) &&
				(includeDiagonals || dRow === 0 || dColumn === 0)
			) {
				addresses.push([thisRow, thisColumn]);
			}
		}
	}
	return addresses;
}

export function gridMap<TValue, TReturn>(
	grid: TValue[][],
	fn: (value: TValue, address: [number, number], grid: TValue[][]) => TReturn,
): TReturn[][] {
	return grid.map((row, rowIndex) =>
		row.map((value, columnIndex) => fn(value, [rowIndex, columnIndex], grid)),
	);
}

export function createPriorityQueue<TValue>() {
	const queue: {
		value: TValue;
		priority: number;
	}[] = [];
	return {
		enqueue: (value: TValue, priority: number) => {
			queue.push({ value, priority });
			queue.sort((a, b) => a.priority - b.priority);
		},
		dequeue: () => queue.shift()?.value,
		peek: () => queue[0]?.value,
		isEmpty: () => queue.length === 0,
	};
}

/**
 * Get all pairs of elements from an array
 */
export function getAllPairs<T>(elements: T[]) {
	return [...elements].flatMap((v, i) =>
		elements.slice(i + 1).map((w) => [v, w]),
	) as [T, T][];
}

/**
 * Get the grid-based distance between two points
 */
export function manhattanDistance(a: [number, number], b: [number, number]) {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

/**
 * Like Array.prototype.splice() but for strings
 */
export function spliceString(
	input: string,
	index: number,
	count: number,
	insertedNew = '',
) {
	if (index < 0 || index > input.length - 1) {
		throw new RangeError(`Index ${index} is out of bounds`);
	}
	if (count < 0) {
		throw new RangeError(`Count ${count} is out of bounds`);
	}
	if (index + count > input.length) {
		throw new RangeError(
			`Index ${index} + count ${count} is out of bounds for string of length ${input.length}`,
		);
	}
	return input.slice(0, index) + insertedNew + input.slice(index + count);
}

/**
 * Transpose a grid
 */
export function transposeGrid<T>(grid: T[][]) {
	if (grid[0] === undefined) {
		throw new Error('Cannot transpose an empty grid');
	}
	return grid[0].map((_, columnIndex) => grid.map((row) => row[columnIndex]));
}

/**
 * Filtering function to remove null and undefined values
 */
export function isNotNullish<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}

export type GridEntry<T> = {
	value: T;
	id: string;
	row: number;
	column: number;
};

export class Grid<T> {
	readonly grid: GridEntry<T>[][];

	readonly width: number;

	readonly height: number;

	constructor(grid: T[][]) {
		if (grid[0] === undefined) {
			throw new Error('Cannot create a grid from an empty array');
		}
		this.height = grid.length;
		this.width = grid[0].length;
		this.grid = gridMap(grid, (value, [row, column]) => {
			return {
				value,
				id: `${row},${column}`,
				row,
				column,
			};
		});
	}

	getNeighbors(
		{ row, column }: { row: number; column: number },
		includeDiagonals = false,
	) {
		return getNeighborAddresses(this.grid, [row, column], includeDiagonals)
			.map(([thisRow, thisCol]) => this.grid[thisRow]?.[thisCol])
			.filter((entry) => entry !== undefined);
	}

	move(
		current: GridEntry<T>,
		direction: Parameters<typeof traverseGrid>[2][0],
		amount = 1,
	) {
		return traverseGrid(
			this.grid,
			[current.row, current.column],
			[direction, amount],
		);
	}

	getAddress(row: number, column: number) {
		if (this.grid[0] === undefined) {
			throw new Error('Cannot get address from an empty grid');
		}
		if (
			row < 0 ||
			row > this.grid.length - 1 ||
			column < 0 ||
			column > this.grid[0].length - 1 ||
			this.grid[row] === undefined
		) {
			throw new RangeError(
				`Address ${row}, ${column} is out of bounds for grid of size ${this.grid.length} x ${this.grid[0].length}`,
			);
		}
		const element = this.grid[row]?.[column];
		if (element === undefined) {
			throw new Error(`No element at ${row}, ${column}`);
		}
		return element;
	}

	getColumns() {
		return transposeGrid(this.grid);
	}

	map<U>(fn: (entry: GridEntry<T>) => U) {
		return gridMap(this.grid, (entry) => fn(entry));
	}

	forEach(fn: (entry: GridEntry<T>) => void) {
		this.grid.flat().forEach((el) => {
			fn(el);
		});
	}

	find(predicate: (entry: GridEntry<T>) => boolean) {
		this.grid.flat().find((el) => predicate(el));
	}

	findAll(predicate: (entry: GridEntry<T>) => boolean) {
		return this.grid.flat().filter((el) => predicate(el));
	}

	clone() {
		return new Grid(this.grid.map((row) => row.map((entry) => entry.value)));
	}
}
