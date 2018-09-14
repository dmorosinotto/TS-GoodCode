export {};

class Currency<T extends string> {
    private __type!: T;
}

type USD = number & Currency<"USD">;
type EUR = number & Currency<"EUR">;

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD) {
    return (net + tax) as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Types of property __type are incompatible. Error: Type '"EUR"' is not assignable to type '"USD"'.
