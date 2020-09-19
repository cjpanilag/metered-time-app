// Use child_process.spawn method from
// child_process module and assign it
// to variable spawn
const spawn = require("child_process").spawn

// running the python script
let pyScript = spawn("python", ["./src/process.py"])


module.exports = pyScript