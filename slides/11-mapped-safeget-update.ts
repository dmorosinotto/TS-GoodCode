export {};
interface DTO {
    addr?: any[];
    flag: boolean;
    name?: string;
    id: number;
}

var dto: DTO = {
    flag: true,
    name: "hello",
    id: 123
};

function safeGet<T, K extends keyof T>(obj: T | null, key: K, def: T[K]): T[K] {
    if (obj == null) return def;
    let ret = obj[key];
    if (ret == null) return def;
    return ret;
}

var ra = safeGet(dto, "id", 2); //123
var rb = safeGet(dto, "flag", false); //true
var rc = safeGet(dto, "addr", ["world"]); //["world"]
var rc = safeGet(dto, "xxx", 1); //INVALID prop
var rc = safeGet(dto, "addr", 123); //INVALID default type

type Partial<T> = { [P in keyof T]?: T[P] }; //Make all properties in T optional

function update<T>(data: T, notify: Partial<T>): T {
    var ret = Object.assign(data, notify);
    console.log(ret);
    return ret;
}

update(dto, { addr: [1, 2, 3], flag: false }); //OK
update(dto, { addr: [4, 5, 6], flag: "true" }); //ERROR flag not boolean
update(dto, { id: "789-0" }); //ERROR id not type string
update(dto, { missing: true }); //ERROR missing not valid
update({ a: 1, b: false, c: "ciao" }, { a: 2, b: "true" });
