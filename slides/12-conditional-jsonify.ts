export {};
//SEE MDN Docs Date.toJSON https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
type JSONify<T> = JSONvalue<T extends { toJSON(): infer U } ? U : T>

type JSONvalue<T> = 
    T extends boolean|number|string|null ? T :
    T extends Function ? never : //FUNCTIONS ARE REMOVED!
    T extends object ? { [P in keyof T]: JSONify<T[P]> } 
    : undefined;

//function deepCopy<T>(obj: T): T { //WRONG SIGNATURE!
function deepCopy<T>(obj: T): JSONify<T> { //CORRECT!
    return JSON.parse(JSON.stringify(obj));
}


type Item = {
    text: string;
    count: number;
    choise: "yes" | "no" | null;
    func: () => void;
    nested: {
        isSaved: boolean;
        arr: [1, 2, "3"];
        when: Date[];
    };
    birthday: Date;
    children: Item[];
};

declare let itm: JSONify<Item>;
itm.text;
itm.count;
itm.choise;
itm.nested.isSaved;
itm.nested.arr[1].toExponential();
itm.children[0].nested.when[1].charAt(2);
itm.children[0].children[1].children[2].nested.isSaved;
itm.func()
itm.birthday.
