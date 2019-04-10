import Register from "./register";

export default class RegisterFile {
    registers: Register[];

    constructor(private REGISTER_COUNT: number, public registerWidth: number) {
        this.registers = [];
        for (let registerIndex = 0; registerIndex < REGISTER_COUNT; registerIndex++) {
            this.registers.push(new Register());
        }
    }
}