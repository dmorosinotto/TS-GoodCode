type Who = "world" | "Daniele";
type Greeting = `hello ${Who}`;

type Getter<T> = {
	[K in keyof T as `get${Uppercase<K & string>}`]: () => T[K];
};
const PRODUCT = {
	sku: "P123-456",
	price: 78.9,
	expire: new Date("2020-02-13T13:50Z"),
	inStock: true,
};
type Product = typeof PRODUCT;
type GETProd = Getter<typeof PRODUCT>;

function BuildGetter<T extends object>(obj: T): Getter<T> {
	return Object.keys(obj).reduce(
		(acc, k) => ({
			...acc,
			[`get${k.toUpperCase()}`]: () => obj[k as keyof T],
		}),
		{} as Getter<T>
	);
	// let ret = {} as Getter<T>;
	// for(const k in obj) {
	//     ret["get" + k.toUpperCase()] = ()=>obj[k];
	// }
	// return ret;
}
const _prod = BuildGetter(PRODUCT);
if (_prod.getINSTOCK()) {
	console.log(_prod.getSKU(), _prod.getPRICE(), " $");
}
