const express = require("express");

const app = express();

const server = app.listen(3000, (req, res) => {
  console.log("Server Started on http://localhost:3000");
});

const GracefulShutDown = () => {
  console.log("Server Stopped");
  server.close(() => {
    console.log("Server Stopped Gracefully");
    process.exit(0);
  });
};

process.on("SIGINT", GracefulShutDown);
