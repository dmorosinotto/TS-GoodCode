export {};
//USO :never al posto di :void --> PHANTHOM TYPE https://medium.com/@dhruvrajvanshi/advanced-typescript-patterns-6cf8826c7944
interface USD {
    __brandUSD: never;
    value: number;
}

interface EUR {
    __brandEUR: never;
    value: number;
}

let usd: USD = { value: 10 } as USD;
let eur: EUR = { value: 10 } as EUR;

function gross(net: USD, tax: USD) {
    return { value: net.value + tax.value } as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Error: Property '__brandUSD' is missing in type 'EUR'.

//APPROCCIO USATO ANKE DA TEAM TYPESCRIPT: https://github.com/Microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698
