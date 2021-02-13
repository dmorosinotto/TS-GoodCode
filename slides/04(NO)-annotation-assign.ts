export {};
const FN = (...args: any[]) => args.length || false;
const OBJ = { prop: "", method: FN, arr: [true] };
type T = typeof OBJ;

declare var UNDEFINED: undefined;
declare var VOID: void;
declare var NULL: null;
declare var BOOLEAN: boolean;
declare var NUMBER: number;
declare var STRING: string;
declare var OBJECT: object;
declare var T: typeof OBJ;
declare var ANY: any;
declare var NEVER: never;
declare var UNKNOWN: unknown;
declare var LITERAL: 1 | "a";

//BASIC TYPE VALUES
UNDEFINED = undefined;
VOID = void 0; //undefined
NULL = null;
BOOLEAN = true;
NUMBER = 123;
STRING = "abc";
OBJECT = OBJ;
T = OBJ;
ANY = {};
UNKNOWN = {} || undefined || null;
NEVER = (function () {
	for (;;) throw "NEVER RETURN or ALWAYS THROW";
})();
LITERAL = Math.random() > 0.5 ? 1 : "a";

let x: never; //TRY TO CHANGE THE TYPE TO SEE WHAT HAPPENS ;-)
//let x: undefined | void | null | boolean | number | string | T | object | any | unknown | never;
//ASSIGNABLE FROM
x = UNDEFINED;
x = VOID;
x = NULL;
x = BOOLEAN;
x = NUMBER;
x = STRING;
x = OBJECT;
x = T;
x = ANY; //always possible   NO TYPE CHECK
x = UNKNOWN; //never possible   -> NEED CAST / TypeGuard!
x = NEVER; //always possible   NEVER IS SUBTYPE of every other types
x = LITERAL;

//ASSIGN TO
UNDEFINED = x;
VOID = x;
NULL = x;
BOOLEAN = x;
NUMBER = x;
STRING = x;
OBJECT = x;
T = x;
ANY = x; //always possible  ANY IS SUPERTYPE of all other types
UNKNOWN = x; //always possible (same as ANY but not the reverse)
NEVER = x; //never possibile   NEVER IS SUBTYPE (domain empty)
LITERAL = x;

//INVOKE FUNCTION
x = OBJ;
x();
x.method();
x["method"]();
x.toString();
//GETTER - SETTER + INDEXER
ANY = x.prop;
ANY = x["prop"]; //OK with object BUT ERROR noImplicitAny
x.prop = ANY;
x["prop"] = ANY; //OK with object BUT ERROR noImplicitAny
