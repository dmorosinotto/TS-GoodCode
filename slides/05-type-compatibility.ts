export {};
// TYPE COMPATIBILITY --> STRUCTURAL TYPE = MATCH "SHAPE"
// SHAPE = public* required property + methods signature
// SPECIAL CASE: class (*private) must share origin="INHERITED"

type TNamed = {
    name: string;
};

interface INamed {
    name: string;
    age?: number; //TRY CHANGE IN string
}

class CNamed {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class CPerson {
    constructor(public name: string, public age: number) {}
    //TRY COMMENT
    //hi() { console.log(this.name, this.age) }
}

const TN: TNamed = { name: "Tanos" };
const IA: INamed = { name: "HALL", age: 9000 };
const CN = new CNamed("Pippo");
const JOHN = new CPerson("John", 42);
const ALICE = { name: "Alice", location: "Seattle" };
//INFER TYPE {name: string, location: string}

// TYPE COMPATIBILITY --> STRUCTURAL TYPE = MATCH "SHAPE"
// SHAPE = public* required property + methods signature
// SPECIAL CASE: class (*private) must share origin="INHERITED"

//ALL VALID BECOUSE SHAPE CNamed = {name: string}
//NO NEED TO EXPLICIT IMPLEMENT INTERFACE OR SHARE BASE CLASS (INHERITS)
//IN A NOMINAL TYPE-SYSTEM (C# or Java) THEY ARE ALL ERRORS!
var cn: CNamed = TN;
var cn: CNamed = IA;
var cn: CNamed = JOHN;
var cn: CNamed = ALICE;

//ALL VALID BECOUSE SHAPE INamed = {name:strin, age?: number}
//age IS OPTIONAL, BUT IF PRESENTE MUST BE number
var i: INamed = TN;
var i: INamed = CN;
var i: INamed = JOHN; //OK age: number!
var i: INamed = ALICE;

//ALL ERROR BECOUSE SHAPE CPerson = {name:string, age:number}
//ALL MISSING age OR differente type!
var pn: CPerson = TN;
var pn: CPerson = CN;
var pn: CPerson = IA; //ERROR: differnt age type!
var pn: CPerson = ALICE;

//CLASS COMPATIBILITY: normally can be different class (with no inheritance) but with SAME "PUBBLIC INTERFACE"
//but if there is a PRIVATE FIELD -> then need to share same private origin baseclass --> REQUIRE INHERITANCE!
class C1 {
    feet!: number;
    constructor(name: string, numFeet: number) {}
}

class C2 {
    feet!: number;
    private _xxx: any;
    constructor(numFeet: number) {}
}

class C2Priv {
    feet!: number;
    private _xxx: any;
    constructor(numFeet: number) {}
}

class C2Ext extends C2 {
    hi() {
        console.log("I Extend C2");
    }
}

let c1: C1;
let c2 = new C2(123);

c1 = c2; //OK same shape (public interface)
c2 = c1; //ERROR: private field not exist in C1!
c2 = new C2Priv(1); //ERROR: even if has same shape and private C2Priv DON'T SHARE ORIGIN -> NO BASE CLASS!
c2 = new C2Ext(456); //OK assignable becouse share common private origin (subtype C2Ext extend C2 --> SAME PRIVATE FIELD!)

//TYPE COMPABILITY in FUNCITONS (CHECK PARAMETER LIST)
let fx = (a: number) => 0;
let fy = (b: number, s: string) => 0; //try use s?:string it enable compatibilty fx=fy OK

fy = fx; // OK ignore extra params (s:string) that will not be used when invoke using fy(123,"ignore me") -> fx(123)
fx = fy; // ERROR becouse fy has more required parameters (s:string) so calling fx(456) I can't pass additional "string"

//TYPE COMPABILITY in FUNCTION (CHECK RETURN TYPE COMPATIBILITY (same shape))
let rx = () => ({ name: "Alice" });
let ry = () => ({ name: "Alice", location: "Seattle" });

rx = ry; // OK ry returns subtype (it has compatible shape with rx)
ry = rx; // ERROR becouse return type rx don't has required location property
