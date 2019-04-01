import Register from "./register";
import ALU from "./ALU";

export default class CPU {
    gp_registers: Register[]; //32 general purpose registers
    alu: ALU;
    status_register: Register;
    instruction_register: Register;
    program_counter: Register;
    stack_pointer: Register;

    instruction_decoder: any;
    
    status_control: any;
    interrupt_unit: any;
    spi: any;
    watchdog_timer: any;
    analog_comparator: any;
    io_modules: any[];
    io_lines: any;

}