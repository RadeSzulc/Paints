const http = require("http");
const app = require("./app");
// set port
const port = process.env.port || 3000;
// env.x = environment variable, if none - 3000

// init server
const server = http.createServer(app);

// start server
server.listen(port)
