export {};

//VEDI ARTICOLO https://abstract.properties/typescript-compile-assertions.html

function pluck3<T, K extends keyof T>(keys: K[], obj: T): { [Item in K]: T[Item] } {
    const accum: { [Item in K]?: T[Item] } = {};
    for (let key of keys) {
        accum[key] = obj[key];
    }
    return accum as { [Item in K]: T[Item] };
}

interface MyStruct {
    str: string;
    num: number;
    bool: boolean;
}

let obj3: MyStruct = {
    str: "hello",
    num: 123,
    bool: true
};

let val3 = pluck3(["str", "num"], obj3);
// val3 now infers to:
//   let val3: {
//       str: string;
//       num: number;
//   }

let val = pluck3(["str", "bool"], obj3);
// val infers to:
//   let val: Partial<MyStruct>
type WhatIsStr = typeof val["str"];
// type WhatIsStr = string | undefined
type WhatIsNum = typeof val["num"];
// type WhatIsNum = number | undefined
type WhatIsBool = typeof val["bool"];
// type WhatIsBool = boolean | undefined

//INTERESSANTE LA VERIFICA DEL MISSING
// - Take an object which has a fallback as `true`:
type AllThingsTrue = { [key: string]: true };

// - And one which is `never` for the defined keys in `T`:
type Invert<T> = { [K in keyof T]: never };

// And merge them with a key lookup:
type TrueIfMissing<T, K extends string> = (Invert<T> & AllThingsTrue)[K];
// Which means all of the following assertions correctly compile:
let str3IsString: typeof val3["str"] extends string ? true : never = true;
let num3IsNumber: typeof val3["num"] extends number ? true : never = true;
let bool3IsMissing: TrueIfMissing<typeof val3, "bool"> = true;
