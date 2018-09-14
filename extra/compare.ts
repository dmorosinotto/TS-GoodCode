export default function compare<T>(obj: T, val: Partial<T>): boolean {
    if (typeof obj !== typeof val) return false;
    if (obj == null || val == null) {
        //GESTICO CASI null, undefined
        return obj === val;
    } else if (typeof val !== "object") {
        return obj === val; //SIMPLE PRIMITIVE+functions uso ===
    } else {
        //COMPLEX OBJECT controlla le proprietà corrispondenti
        for (let k in val) {
            const y = val[k];
            if (typeof y === "object") {
                if (!compare(obj[k], y as any)) return false;
            } else if (obj[k] !== y) return false;
        }
        return true;
    }
}

console.log("--COMPLEX OBJECT--");
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }); //TRUE
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123 }); //TRUE
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { f: false }); //TRUE
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: false }); //TRUE
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: false, o: {} } as any); //TRUE
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: false, o: { x: "ciao", y: [] } }); //TRUE
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 456, f: false, o: { x: "ciao", y: [1, 2, 3] } }); //false
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: false, o: { x: "miao", y: [1, 2, 3] } }); //false
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: true, o: { x: "ciao", y: [1, 2, 3] } }); //false
compare({ n: 123, f: false, o: { x: "ciao", y: [1, 2, 3] } }, { n: 123, f: false, o: { x: "ciao", y: [1, 2, 4] } }); //false
