export {};
//VEDI ESEMPIO ANDERS https://youtu.be/wpgKd-rwnMw?t=42m44s
type JSONify<T> = JSONvalue<T extends { toJSON(): infer U } ? U : T>

type JSONvalue<T> = 
    T extends boolean|number|string|null ? T :
    T extends Function ? undefined :
    //T extends Array<infer U> ? JSONarray<U>:
    T extends object ? { [P in keyof T]: JSONify<T[P]> } 
    : undefined;
//type Undefined2Null<T> = T extends undefined ? null : T;
//interface JSONarray<T> extends Array<Undefined2Null<JSONify<T>>> {};

function deepCopy<T>(obj: T): JSONify<T> {
    return JSON.parse(JSON.stringify(obj));
}

declare class Widget {
    x: number;
    toJSON(): { kind: "Widget"; date: Date };
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
    widget?: Widget;
    children: Item[];
};

declare let itm: JSONify<Item>;
itm.text;
itm.count;
itm.choise;
itm.nested.arr[0];
itm.nested.when[2];
itm.children[0].nested.when[1].charAt(2);
itm.children[0].children[1].children[2].nested.issaved;
