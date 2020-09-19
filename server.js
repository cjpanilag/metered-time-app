const app = require("express")()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000
// passing the python script
const pyScript = require('./src/process.js')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')

    // running the python script
    pyScript.stdout.on("data", function (data) {
        let obj = JSON.parse(data.toString())
        socket.emit('message', obj)
        console.log(obj)
    })
})

http.listen(PORT, () => {
    console.log('listening on port: ' + PORT)
})

