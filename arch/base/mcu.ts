export default abstract class MCU {
    constructor(
        public flash_size: number,
        public eeprom_size: number,
        public ram_size: number,
        public data_bus_width: number,
        public interrupt_vector_size: number,
        public boot_size: number
    ) {

        //TODO: calculate program_counter_width width flash_size
    }
}