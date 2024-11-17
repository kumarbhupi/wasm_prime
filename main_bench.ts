// deno-lint-ignore-file
import { isPrime } from "./main.ts";
//import { is_prime } from "./native_is_prime/pkg/native_is_prime.js";

const wasmCode = await Deno.readFile(
    "./native_is_prime/pkg/native_is_prime_bg.wasm",
);

const imports = {
    __wbindgen_placeholder__: {
        __wbindgen_init_externref_table: function () {
            const table = wasm.__wbindgen_export_0;
            //@ts-ignore
            const offset = table.grow(4);
            //@ts-ignore
            table.set(0, undefined);
            //@ts-ignore
            table.set(offset + 0, undefined);
            //@ts-ignore
            table.set(offset + 1, null);
            //@ts-ignore
            table.set(offset + 2, true);
            //@ts-ignore
            table.set(offset + 3, false);
        },
    },
};

const wasmInstance =
    (await WebAssembly.instantiate(wasmCode, imports)).instance;
const wasm = wasmInstance.exports;

Deno.bench({ group: "tests", name: "Deno" }, () => {
    for (let i = 0; i < 1000000; i++) {
        isPrime(i);
    }
});

Deno.bench({ group: "tests", name: "WASM" }, () => {
    for (let i = 0; i < 1000000; i++) {
        //@ts-ignore
        wasm.is_prime(i);
    }
});
