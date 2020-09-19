const express = require("express");
const app = express();
const server = require("http").createServer(app);
// web socket instantiation
const WebSocket = require("ws");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const wss = new WebSocket.Server({ server: server });
// constant port
const port = process.env.PORT || 3000;

// triggered everytime thier is new client
wss.on("connection", function connection(ws) {
  console.log("new client connected");
  // message sent to the client
  // passing the python script
  let process = require('./src/process.js');
  // running the python script
  process.stdout.on("data", function (data) {
    ws.send(data.toString());
    console.log(data.toString());
  });

  // wss.clients.forEach(function each(client) {
  //   if (client.readyState === WebSocket.OPEN) {
  //     // passing the python script
  //     var process = require('./src/process.js');
  //     // running the python script
  //     process.stdout.on("data", function (data) {
  //       client.send(data.toString());
  //       console.log(data.toString());
  //     });
  //   }
  // });

  // receive message in any client
  // ws.on('message', function incoming(message) {
  //     console.log('received: %s', message);
  //     // send back to the client, client message
  //     // A client WebSocket broadcasting to every other connected WebSocket clients, excluding itself
  //     wss.clients.forEach(function each(client) {
  //         if (client !== ws && client.readyState === WebSocket.OPEN) {
  //             client.send(massage);
  //         }
  //     });
  // });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public");
});

server.listen(port, () => console.log("Listening on port: " + port));
