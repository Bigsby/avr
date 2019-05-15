const REGISTER_COUNT = 32;
const BUS_WIDTH = 8;
const RAM_SIZE = 16;
const FLASH_SIZE = 255;
const OPCODE_WIDTH = 16;
const CLOCK_INTERVAL = 500;
const CLOCK_INCREMENT = 100;

const EVENTS = {
    CLOCK_HIGH: "CLOCK_HIGH",
    CLOCK_LOW: "CLOCK_LOW"
};
const CONTROL = {
    INSTRUCTION_OUT: 1 << 0,
    INSTRUCTION_IN: 1 << 1,
    REGISTER_A_OUT: 1 << 2,
    REGISGER_A_IN: 1 << 3,
    REGISTER_B_OUT: 11 << 4,
    ALU_OUT: 1 << 5,
    RAM_OUT: 1 << 6,
    RAM_IN: 1 << 7,
    PROGRAM_COUNTER_ENABLED: 1 << 8
};

function getTemplate(name) {
    return document.getElementById(name).innerHTML
}

let registers = [];
for (let registerIndex = 0; registerIndex < REGISTER_COUNT; registerIndex++) {
    registers.push({
        index: registerIndex,
        value: 0
    });
}

let eventBus = new Vue({
    data() {
        return {
            status: 0 | CONTROL.PROGRAM_COUNTER_ENABLED,
            isSet(bit) {
                return this.status & bit === bit;
            },
            set(bit) {
                this.status != bit;
            },
            clear(bit) {
                this.status ^= bit;
            }
        };
    }
});

const initial_data = {
    config: {
        opcode_width: OPCODE_WIDTH,
        bus_width: BUS_WIDTH,
        flash_size: FLASH_SIZE,
        ram_size: RAM_SIZE,
        program: [
            [25, 12],
            [46, 128],
            [1, 38]
        ]
    },
    alu: {
        target_operand: 5 | 1,
        source_operand: 255
    },
    registers: registers,
    bus_value: 2,
    ram_address: 0,
    flash_address: 0,
    eeprom_addres: 0,
    op_code: 0
};

Vue.component("bus", {
    template: getTemplate("bus"),
    data() {
        return {
            eventBus: eventBus
        }
    },
    props: ["value"],
});

Vue.component("program-counter", {
    template: getTemplate("program-counter"),
    data() {
        return {
            eventBus: eventBus,
            innerValue: this.value || 0
        }
    },
    props: ["value", "in", "out"],
    created() {
        this.eventBus.$on(EVENTS.CLOCK_HIGH, function () {
            if (this.eventBus.isSet(CONTROL.PROGRAM_COUNTER_ENABLED)) {
                this.innerValue++;
            }
        }.bind(this));
    }
});

Vue.component("clock", {
    template: getTemplate("clock"),
    data() {
        return {
            value: false,
            eventBus: eventBus,
            interval: CLOCK_INTERVAL,
            is_running: false
        };
    },
    methods: {
        clearTimer() {
            if (this._timer) {
                clearInterval(this._timer);
            }
            this.is_running = false;
        },
        setTimer() {
            this.clearTimer();

            this._timer = this._timer = setInterval(function () {
                this.advance();
            }.bind(this), this.interval);
            this.is_running = true;
        },
        advance() {
            this.value = !this.value;
            this.eventBus.$emit(this.value ? EVENTS.CLOCK_HIGH : EVENTS.CLOCK_LOW);
        },
        increment() {
            this.interval += CLOCK_INCREMENT;
            this.setTimer();
        },
        decrement() {
            if (this.interval === 0) return;
            this.interval -= CLOCK_INCREMENT;
            this.setTimer();
        },
        pause() {
            this.clearTimer();
        },
        play() {
            this.setTimer();
        },
        step() {
            this.advance();
        }
    }
});

Vue.component("instruction", {
    template: getTemplate("instruction"),
    data() {
        return {
            eventBus: eventBus,
            higher: this.op_code >> 8,
            lower: this.op_code & 0xff
        };
    },
    created() {
        this.eventBus.$on(EVENTS.CLOCK_HIGH, _ => {
            // if ()
            // this.higher = values[0];
            // this.lower = values[1];
        });
    },
    props: ["op_code", "in"]
});

Vue.component("alu", {
    template: getTemplate("alu"),
    data() {
        return {
            eventBus: eventBus
        };
    },
    props: ["target_operand", "source_operand", "out"]
});

Vue.component("ram", {
    template: getTemplate("ram"),
    props: ["config", "ram_address"],
    data() {
        return {
            eventBus: eventBus
        };
    }
});

Vue.component("flash", {
    template: getTemplate("flash"),
    props: ["config", "flash_address"],
    data() {
        return {
            eventBus: eventBus,
            address: this.flash_address,
            change_event: EVENTS.OPCODE_CHANGE
        };
    },
    created() {
        this.eventBus.$on(EVENTS.CLOCK_HIGH, _ => {
            // this.address = instructionAddress;
        });
    }
});

Vue.component("memory", {
    template: getTemplate("memory"),
    props: ["name", "address", "width", "size", "initial_data", "in", "out", "change_event"],
    watch: {
        address: function (newAddress) {
            this.setValues();
        }
    },
    methods: {
        initalizeData() {
            console.log("initializing data for" + this.name);
            if (this.initial_data) {
                return this.initial_data;
            } else {
                const result = new Array(this.width);
                for (let sizeIndex = 0; sizeIndex < this.size; sizeIndex++) {
                    result[sizeIndex] = new Array(this.width);
                    for (let widthIndex = 0; widthIndex < this.width; widthIndex++) {
                        result[sizeIndex][widthIndex] = 0;
                    }
                }
                return result;
            }
        },
        setValues() {
            console.log("setting values for" + this.name);
            for (let widthIndex = 0; widthIndex < this.width; widthIndex++) {
                this.values[widthIndex] = this.memory[this.address] && this.memory[this.address][widthIndex] || 0;
            }
            if (this.change_event) {
                this.eventBus.$emit(this.change_event, this.values);
            }
        }
    },
    data() {
        return {
            eventBus: eventBus,
            memory: this.initalizeData(),
            values: new Array(this.width)
        };
    },
    created() {
        console.log("creating " + this.name);
        this.setValues();
        console.log("created " + this.name);
    }
});

Vue.component("register", {
    template: getTemplate("register"),
    data() {
        return {
            eventBus: eventBus
        };
    },
    props: ["value", "index", "in", "out"]
});

Vue.component("boxed-component", {
    template: getTemplate("boxed-component"),
    props: ["title", "color", "container_class"]
});

Vue.component("byte", {
    template: getTemplate("byte"),
    props: ["value"],
    data() {
        return {
            eventBus: eventBus,
            width: BUS_WIDTH
        };
    },
    methods: {
        toHexString: function (value) {
            let str = (value || 0).toString(16).toUpperCase();;
            const numberzeros = (this.width / 4) - str.length;
            if (numberzeros < 0) {
                console.log(`hex ${value} ${this.width} ${str}`);
            }

            return "0".repeat((this.width / 4) - str.length) + str;
        },
        toDecimalString: function (value) {
            let str = (value || 0).toString();
            return "0".repeat(Math.pow(2, this.width).toString().length - str.length) + str;
        },
        bitValue: function (bit, value) {
            return Math.pow(2, this.width - bit) & value ? 1 : 0;
        }
    }
});

let app = new Vue({
    el: "div#app",
    data: initial_data
});