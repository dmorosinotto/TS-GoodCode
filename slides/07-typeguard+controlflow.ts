export {};

interface Bird {
    fly(): void;
    layEggs(): number;
}

interface Fish {
    swim(): void;
    layEggs(): number;
}

//CUSTOM TYPEGUARD
function isBird(pet: Bird | Fish): pet is Bird {
    return "fly" in pet && typeof pet.fly === "function";
}

//CONTROL FLOW ANALYSIS
function move(pet: Bird | Fish) {
    var n = pet.layEggs(); //ALWAYS CALLABLE (common in Bird|Fish)
    if (!isBird(pet)) {
        pet.fly(); //OK HERE pet IS INFERRED Bird
    } else {
        pet.swim(); //OK HERE pet IS INFERRED Fish
    }
}
