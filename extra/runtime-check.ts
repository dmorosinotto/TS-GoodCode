//VIDEO DA: https://youtu.be/010daBQPFmw?t=21m43s

//THE type OF A TYPE-CHECKER IS TYPE-ASSERION "is"
type Type<T> = (value: any) => value is T; //return true if value is of type T

//NumberType = Type<number> = (value:any) => typeof value === "number";
function NumberType(value: any): value is number;
function NumberType(value: any) {
    return typeof value === "number";
}

function StringType(value: any): value is string;
function StringType(value: any) {
    return typeof value === "string";
}

function print(x: any) {
    if (NumberType(x)) {
        console.log(x * 42); //<-- HERE x is number
    } else {
        console.log("Not a number:", x);
    }
}

//type Union<A,B>
function Union<A, B>(a: Type<A>, b: Type<B>): (value: any) => value is A | B;
function Union(...subTypes: Type<any>[]) {
    return (value: any) => subTypes.some(subType => subType(value));
}

const NumberOrString = Union(StringType, NumberType);

function print(x: any) {
    if (NumberOrString(x)) {
        console.log(x * 42); //<-- HERE x is number|string
        console.log(x.toString()); //valid for number|string
    } else {
        console.log("NOT a number either a string!");
    }
}

type Properties = {
    [key: string]: Type<any>;
};

type InstanceShape<T> = { [K in keyof T]: T[K] extends Type<infer X> ? X : never };

function Shape<T extends Properties>(props: T): (value: any) => value is InstanceShape<T>;
function Shape(props: Properties) {
    return (value: any) => value && Object.keys(props).every(key => props[key](value[key]));
}

const Person = Shape({
    name: StringType,
    age: NumberType
});

function print(x: any) {
    if (Person(x)) {
        //<-- HERE x is {name: string, age: number}
        console.log(x.name);
        console.log(x.age);
        console.log(x.notexist);
    }
}
