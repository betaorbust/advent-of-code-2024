import {
	arrayPartition,
	cartesianProduct,
	getAddressOnGrid,
	getNeighbors,
	leastCommonMultiple,
	setIntersection,
	spliceString,
	traverseGrid,
} from './junk-drawer.ts';

describe('setUnion', () => {
	test('One set', () => {
		expect(setIntersection([new Set([1, 2, 3])])).toEqual(new Set([1, 2, 3]));
	});
	test('Two sets', () => {
		expect(setIntersection([new Set([1, 2, 3]), new Set([2, 3, 4])])).toEqual(
			new Set([2, 3]),
		);
	});
	test('Three sets', () => {
		expect(
			setIntersection([
				new Set([1, 2, 3]),
				new Set([2, 3, 4]),
				new Set([3, 4, 5]),
			]),
		).toEqual(new Set([3]));
	});
});

describe('partitionArray', () => {
	test('By 1', () => {
		expect(arrayPartition([1, 2, 3, 4, 5, 6, 7, 8, 9], 1)).toEqual([
			[1],
			[2],
			[3],
			[4],
			[5],
			[6],
			[7],
			[8],
			[9],
		]);
	});
	test('By 2', () => {
		expect(arrayPartition([1, 2, 3, 4, 5, 6, 7, 8, 9], 2)).toEqual([
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
			[9],
		]);
	});
	test('By 3', () => {
		expect(arrayPartition([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);
	});
});

describe('cartesianProduct', () => {
	test('One', () => {
		expect(cartesianProduct([[1, 2, 3]])).toEqual([1, 2, 3]);
	});
	test('Two sets', () => {
		expect(
			cartesianProduct([
				[1, 2],
				[4, 5, 6],
			] as const),
		).toEqual([
			[1, 4],
			[1, 5],
			[1, 6],
			[2, 4],
			[2, 5],
			[2, 6],
		]);
	});
	test('Three mixed sets', () => {
		expect(
			cartesianProduct([
				[1, 2],
				['a', 'b'],
				[true, false],
			]),
		).toEqual([
			[1, 'a', true],
			[1, 'a', false],
			[1, 'b', true],
			[1, 'b', false],
			[2, 'a', true],
			[2, 'a', false],
			[2, 'b', true],
			[2, 'b', false],
		]);
	});
});

describe('leastCommonMultiple', () => {
	test('Two numbers', () => {
		expect(leastCommonMultiple(4, 6)).toBe(12);
	});

	test('Three numbers', () => {
		expect(leastCommonMultiple(3, 5, 7)).toBe(105);
	});

	test('Four numbers', () => {
		expect(leastCommonMultiple(2, 4, 6, 8)).toBe(24);
	});
});

describe('traverseGrid', () => {
	test('grid operations', () => {
		const grid = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		expect(traverseGrid(grid, [0, 0], ['E', 2])).toEqual({
			value: 3,
			address: [0, 2],
		});
		expect(traverseGrid(grid, [0, 0], ['SE', 2])).toEqual({
			value: 9,
			address: [2, 2],
		});
		expect(() => traverseGrid(grid, [0, 0], ['W', 2])).toThrow();
	});
});

describe('getAddressOnGrid', () => {
	test('gets an address', () => {
		const grid = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		expect(getAddressOnGrid(grid, [0, 0])).toEqual(grid[0]?.[0]);
		expect(getAddressOnGrid(grid, [2, 2])).toEqual(grid[2]?.[2]);
	});
});

describe('getNeighbors', () => {
	test('gets neighbors', () => {
		const grid = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		expect(getNeighbors(grid, [0, 0]).sort()).toEqual([2, 4, 5]);
		expect(getNeighbors(grid, [1, 1]).sort()).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
		expect(getNeighbors(grid, [2, 2]).sort()).toEqual([5, 6, 8]);
	});
});

describe('spliceString', () => {
	it('should correctly splice a string', () => {
		expect(spliceString('Hello, world!', 7, 5, 'planet')).toBe(
			'Hello, planet!',
		);
	});

	test.each([
		['index out of range', ['Hello, world!', 50, 5, 'planet']],
		['count is negative', ['Hello, world!', 7, -5, 'planet']],
		['negative index', ['Hello, world!', -3, 2, 'planet']],
		['count greater than string length', ['Hello, world!', 0, 50, 'planet']],
	] as const)(
		'should throw RangeError when %s',
		(_, [str, index, count, replacement]) => {
			expect(() => spliceString(str, index, count, replacement)).toThrow(
				RangeError,
			);
		},
	);
});
