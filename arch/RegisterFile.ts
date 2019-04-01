import Register from "./register";

export default class RegisterFile {
    registers: Register[];

    constructor(private registerCount: number, public registerWidth: number) {
        this.registers = [];
        for (let registerIndex = 0; registerIndex < registerCount; registerIndex++) {
            this.registers.push(new Register());
        }
    }
}