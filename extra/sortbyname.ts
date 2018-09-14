interface INamed {
    name: string;
}

function sortByName<T extends INamed>(a: T[]) {
    var result = a.slice(0);
    result.sort((x, y) => x.name.localeCompare(y.name));
    return result;
}

sortByName([]);
var arr = [{ name: "Daniele", age: 42 }, { name: "Pippo", age: 18 }, { name: "Arcibald", age: 90 }];

var ret = sortByName(arr);
ret[0].name;
ret[1].age;

var arr2 = [{ name: "Daniele", sex: "M" }, { name: "Pippo", sex: "M" }, { name: "Arcibalda", sex: "F" }];

var ret2 = sortByName(arr2);
ret2[1].name;
ret2[0].sex;

console.log(ret);

class PName {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class PNameAge extends PName {
    constructor(name: string, public age: number) {
        super(name);
    }
}

var arr3 = [{ name: "Daniele", sex: "M" }, new PName("pippo"), new PNameAge("Pluto", 42)];

var ret3 = sortByName(arr3);
ret3[1].name;
ret3[0].sex;
var pluto = ret3.find(e => e.name == "Pluto");
if (pluto instanceof PNameAge) {
    pluto.age;
}
