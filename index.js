const express = require('express');

const hubsRouter = require("./hubs/router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", hubsRouter);


server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.listen(5000, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});