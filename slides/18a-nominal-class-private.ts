export {};

class USD {
    private __nominal: void;
    constructor(public value: number) {}
}

class EUR {
    private __nominal: void;
    constructor(public value: number) {}
}

const usd = new USD(10);
const eur = new EUR(10);

function gross(net: USD, tax: USD) {
    return { value: net.value + tax.value } as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Error: Types have separate declarations of a private property '__nominal'.
