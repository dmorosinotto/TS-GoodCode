import compare from "./compare";

function _search<T>(arr: T[], cond: (item: T) => boolean): T | null {
    for (let i = 0; i < arr.length; i++) {
        if (cond(arr[i])) return arr[i];
    }
    return null;
}

export function searchBy<T>(arr: T[], sample: Partial<T>): T | null {
    return _search(arr, i => compare(i, sample));
}

export function filterBy<T>(arr: T[], sample: Partial<T>): T[] {
    return arr.filter(i => compare(i, sample));
}
