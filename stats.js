const ops = require("./data/ops.json");
const opTypes = require("./data/opTypes.json");

console.log(`Number of ops: ${ops.length}`);
opTypes.forEach(opType => {
    const opsOfType = ops.filter(op => op.type === opType.id);
    console.log(`${opsOfType.length}: ${opType.name} (${opType.id})`);
});