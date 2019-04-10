const ops = require("./data/ops.json");

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
// ops.forEach(op => {
//     if (firstWord(op))
//     console.log(`${firstWord(op)} : ${op.type} : ${op.syntax} : ${op.name}`);
// });

const operands = [];

function addOperand(operandName, restriction) {
    let operand = operands.find(op => op.name === operandName);
    if (!operand) {
        operand = {
            name: operandName,
            restrictions: {

            }
        }
        operands.push(operand);
    }
    if (!operand.restrictions[restriction]) {
        operand.restrictions[restriction] = [];
    }
    return operand;
}

function areArraysEqual(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }

    for (let index = 0; index < array1.length; index++) {
        if (array1[index] !== array2[index]) {
            return false;
        }
    }
    return true;
}

function addIndexesToOperand(operand, indexes) {
    if (!operand.indexes) {
        operand.indexes = [];
    }

    let exists = false;
    operand.indexes.forEach(existing => exists |= areArraysEqual(indexes, existing));
    if (!exists) {
        operand.indexes.push(indexes);
    }
}

function getPositionsInOpCode(operand, opCode) {
    if (opCode) {
        const indexes = [];
        let spacesFound = 0;
        for (let codeIndex = 0; codeIndex < opCode.length; codeIndex++) {
            if (opCode[codeIndex] === operand.name) {
                indexes.push(codeIndex - spacesFound);
            }
            if (opCode[codeIndex] === " ") {
                spacesFound++;
            }
        }
        addIndexesToOperand(operand, indexes);
    }
}

function getPositionsInOperation(operand, op) {
    if (Array.isArray(op.opCode)) {
        op.opCode.forEach(opCode => getPositionsInOpCode(operand, opCode));
    } else {
        getPositionsInOpCode(operand, op.opCode);
    }
}

ops.forEach(op => {
    if (op.operands) {
        for (const operandName in op.operands) {
            const restriction = op.operands[operandName];
            const operand = addOperand(operandName, restriction);
            getPositionsInOperation(operand, op);
        }
    }
});

function indexesDisplay(indexes) {
    let result = "";
    for (let index = 0; index < 16; index++) {
        if (indexes.includes(index)) {
            result += " \x1b[0m" + index;
        } else {
            result += " \x1b[2m" + index;
        }
    }
    result += "\x1b[0m";
    return result;
}

operands.forEach(operand => {
    console.log(`${operand.name}: ${operand.restrictions}`);
    operand.indexes.forEach(index => console.log(`  ${indexesDisplay(index)}`));
    console.log();
});