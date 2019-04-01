import MCU from "./base/mcu";
import { K } from "./base/values";

export class ATmega48 extends MCU {
    constructor() {
        super(4 * K, 256, 512, 8, 1, 0);
    }
}

export class ATmega88 extends MCU {
    constructor() {
        super(8 * K, 512, 1 * K, 8, 1, 0x0FFF);
    }
}

export class ATmega168 extends MCU {
    constructor() {
        super(16 * K, 512, 1 * K, 8, 2, 0x1FFF);
    }
}

export default class ATmega328 extends MCU {
    constructor() {
        super(32 * K, 1 * K, 2 * K, 8, 2, 0x3FFF);
    }
}