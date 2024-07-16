import { log } from "console";

class Singleton {
    static #instance: Singleton;

    //The Singleton's constructor should always be private to prevent direct construction calls with the `new` operator.
    private constructor() {}

    //The static getter that controls access to the singleton instance.

    public static get instance(): Singleton {
        if (!Singleton.#instance) {
            Singleton.#instance = new Singleton();
        }

        return Singleton.#instance;
    }
}

//The client code.
const clientCode = () => {
    const singleton1 = Singleton.instance;
    const singleton2 = Singleton.instance;

    if (singleton1 == singleton2) {
        console.log(
            "Singleton works, both variables contain the same instance."
        );
    } else {
        console.log("Singleton failed, variables contain different instances.");
    }
};

clientCode(); // Outputs: Singleton works, both variables contain the same instance.
