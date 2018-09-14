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
    //TRY DECCOMENT
    //hi() { console.log(this.name, this.age) }
}

const TN: TNamed = { name: "Tanos" };
const IA: INamed = { name: "HALL", age: 9000 };
const CN = new CNamed("Pippo");
const JOHN = new CPerson("John", 42);
const ALICE = { name: "Alice", location: "Seattle" };
//INFER TYPE {name: string, location: string}

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

//CLASS COMPATIBILITY: non importa "il tipo esatto" basta che corrisponda INTERFACCIA PUBBLICA
//ammeno che non ci sia di mezzo membri PRIVATI --> allora devono condividere Classe Base (stesso private)
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

c1 = c2; //OK stessa forma (pubblica)
c2 = c1; //ERROR: private non assegnabile!
c2 = new C2Priv(1); //ERROR: stessa forma e private MA NON HANNO LA STESSA base class
c2 = new C2Ext(456); //OK assegnabile perchè private comune (subtype/extend deriva implica stesso private)

//TYPE COMPABILITY nelle FUNCITONS (CONTROLLA PARAMETRI)
let fx = (a: number) => 0;
let fy = (b: number, s: string) => 0; //provare con s?:string rende compatible anche fx=fy OK

fy = fx; // OK ignora extra parametri (s:string) che non sarebbe usato quando chiamo fx invocando fy(123,"ignore me")
fx = fy; // ERRORE perchè fy ha più parametri required (s:string) quindi quando chiamo fx(456) non riuscirei a passare "string"

//TYPE COMPABILITY nelle FUNCTION (CONTROLLA RETURN)
let rx = () => ({ name: "Alice" });
let ry = () => ({ name: "Alice", location: "Seattle" });

rx = ry; // OK ry ritorna subtype (ossia estende tipo base di rx)
ry = rx; // ERRORE perchè il tipo di ritorno di rx manca della proprietà location obbligatoria
