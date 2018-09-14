export {};

type TypeName<T> =
        T extends string ? "string" :
        T extends number ? "number" :
        T extends boolean ? "boolean" :
        T extends undefined ? "undefined" :
        T extends Function ? "function" :
        "object";

type T0 = TypeName<string>  //"string"
type T1 = TypeName<"a">     //"string"
type T2 = TypeName<string[]>//"object"
type T3 = TypeName<()=>string>//"function"
//DISTRIBUTED Conditional Types OVER UNIONS???  http://www.typescriptlang.org/docs/handbook/advanced-types.html
type T4 = TypeName<number | (()=>number)> //"number" | "function"
type T5 = TypeName<string | string[] | undefined>; //"string"|"object"|"undefined"
type T6 = TypeName<boolean | undefined | null | never>; //"boolean"|"undefined"|"object"

//VIDEO https://youtu.be/wpgKd-rwnMw?t=36m49s
function typeOf<T>(x:T) {
    return typeof x as TypeName<T>;
}

function foo(x: string|string[]|undefined, y:number|(()=>number)) {
    const tx = typeOf(x);   //"string"|"undefined"|"object"
    const ty = typeOf(y);   //"number"|"function"
}