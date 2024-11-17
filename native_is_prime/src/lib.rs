use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn is_prime(number: u32) -> bool {
    if number <= 1 {
        return false;
    }

    if number == 2 {
        return true;
    }

    if number % 2 == 0 {
        return false;
    }

    let limit = ((number as f64).sqrt() as u32) + 1;

    for i in (3..limit).step_by(2) {
        if number % i == 0 {
            return false;
        }
    }

    return true;
}
