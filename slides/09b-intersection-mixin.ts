export {};

function mixin<A extends object, B extends object>(a: A, b: B): A & B {
    var ret2 = Object.assign({}, a, b);
    return ret2; //MIXIN WIN LAST

    let res = <A & B>{};
    for (let k in a) {
        (<any>res)[k] = a[k];
    }
    for (let k in b) {
        //if (!res.hasOwnProperty(k)) {
        (<any>res)[k] = b[k];
        //}
    }
    return res; //MIXIN WIN FIRST

    var ret3 = { ...a, ...b };
    return ret3 as A & B; //FOR REACT/REDUX PEOPLE
}

var r = mixin({ n: 123 }, { s: "hello" });
r.n.toFixed(2);
r.s.substr(3);
console.log(r); // {a: 123 , b: "hello"}
