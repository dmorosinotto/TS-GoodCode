export {};

//GENERIC Brand + Intersection  https://michalzalecki.com/nominal-typing-in-typescript/
type Brand<T, B> = T & { readonly __brand: B };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
    return (net + tax) as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Types of property __brand are incompatible. Type '"EUR"' is not assignable to type '"USD"'.
