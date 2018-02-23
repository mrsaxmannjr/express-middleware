const express = require("express");
// const morgan = require("morgan");

const app = express();

// app.use(morgan("tiny"));


app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use((req, res, next) => {
  const now = new Date();
  console.log(`${req.method} - ${req.originalUrl} - ${now}`);
  next();
});


app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(400);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    messgae: err.message,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
