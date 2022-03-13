/**
 * Moves an array element from one index to another. The result is a modified copy of the array (the
 * function is non-mutating)
 */
export function moveInArray<T>(array: T[], fromIndex: number, toIndex: number): T[] {
	if (fromIndex < 0 || fromIndex >= array.length) {
		throw Error(`Invalid value \`${fromIndex}\` for \`fromIndex\` parameter`);
	}
	if (toIndex < 0 || toIndex >= array.length) {
		throw Error(`Invalid value \`${toIndex}\` for \`toIndex\` parameter`);
	}
	if (fromIndex === toIndex) {
		return array;
	}

	const result = [...array];
	result.splice(toIndex, 0, result.splice(fromIndex, 1)[0]);
	return result;
}
