const ops = require("./docs/ops.json");

function firstWord(op) {
    if (op.opCode) {
        if (Array.isArray(op.opCode)) {
            return op.opCode[0];
        }
        return op.opCode;
    }
    return null;
}

ops.sort((op1, op2) => firstWord(op1) > firstWord(op2) ? 1 : -1);
ops.forEach(op => {
    if (firstWord(op))
    console.log(`${firstWord(op)} : ${op.type} : ${op.syntax} : ${op.name}`);
});