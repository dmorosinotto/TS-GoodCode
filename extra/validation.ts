//VIDEO DA: https://youtu.be/010daBQPFmw?t=9m07s

export {};
//TYPE SIGNATURE: Does 'value' belongs to domain 'type'?
//const Type = value => boolean; //Basic Type validator
type Type = ((value: any) => boolean);

const BoolType = (value: any) => typeof value === "boolean";
const StringType = (value: any) => typeof value === "string";

console.log(StringType(3)); //false
console.log(StringType("Daniele")); //true

//The Age type --> is it a number?  +  is it an integer?  +  is it a valid age?
const NumberType = (value: any) => typeof value === "number";
const Integer = (value: any) => NumberType(value) && (0 | value) === value;

console.log(Integer(2.5)); //false
console.log(Integer("3")); //false
console.log(Integer(2)); //true

const Age = (value: any) => Integer(value) && value >= 0 && value <= 130;

console.log(Age(true)); //false
console.log(Age(-4)); //false
console.log(Age(73)); //true

//PARAMETRIZED TYPES Range()
function Range(minAge: number, maxAge: number) {
    return function(value: any) {
        return Integer(value) && value >= minAge && value <= maxAge;
    };
}

const HumanAge = Range(0, 130);
console.log(HumanAge(73)); //true

const SoldierAge = Range(18, 40);
console.log(SoldierAge(73)); //false
console.log(SoldierAge(33)); //true

// LITERAL TYPES
const Null = (value: any) => value === null;
const Undefined = (value: undefined) => value === undefined;
//A type domain that exist of exactly one value; namely 'literalValue'Applications
const Literal = (literalValue: any) => (value: any) => value === literalValue;

// HIGH-ORDER TYPES
const Union = (...subTypes: Type[]) => (value: any) => subTypes.some(subType => subType(value));

//UNION & LITERAL
const SoldierRole = Union(Literal("grenedier"), Literal("fusilier"), Literal("voltigeur"));
console.log(SoldierRole("wizard")); //false
console.log(SoldierRole("fusilier")); //true

//ENUMERATIONS
const Enum = (...values: string[]) => Union(...values.map(Literal));
const UserRole = Enum("admin", "dev", "user");

//HIGH-ORDER GENERIC OBJECT VALIDATE
const Shape = (props: { [key: string]: Type }) => (value: any) =>
    value &&
    //Object.entries(props).every(([key,type])=> type(value[key]));
    Object.keys(props).every(key => props[key](value[key]));

const Soldier = Shape({
    name: StringType,
    age: SoldierAge,
    role: SoldierRole
});

console.log(
    Soldier({
        gears: 5
    })
); //false

console.log(
    Soldier({
        name: "Michel",
        age: 33,
        role: "fusilier"
    })
); //true

const User = Shape({
    name: StringType,
    age: HumanAge,
    role: UserRole
});
const MaybeUser = Union(User, Undefined);
console.log(MaybeUser(undefined)); //true
console.log(MaybeUser({ gears: 5 })); //false
console.log(MaybeUser({ name: "Daniele", age: 42, role: "dev" })); //true

//GENERICS
const AnyList = (value: any) => Array.isArray(value);
const PoorArmy = AnyList; /* Of soldiers obviusly */

console.log(PoorArmy([{ name: "Michel", age: 33, role: "fusilier" }])); //true
console.log(PoorArmy([{ gear: 5 }])); //true

//HIGH-ORDER TYPES
const List = (subType: Type) => (value: any) => Array.isArray(value) && value.every(subType);
const Army = List(Soldier);
console.log(Army([{ name: "Michel", age: 33, role: "fusilier" }])); //true
console.log(Army([{ gear: 5 }])); //false
const Horse = Shape({ leg: Integer });

const GrandeArmee = (value: any) => List(Union(Soldier, Horse)) && value.length > 1; //10000

console.log(GrandeArmee([{ name: "Michel", age: 33, role: "fusilier" }, { leg: 4 }])); //true
console.log(GrandeArmee([{ gear: 5 }])); //false
