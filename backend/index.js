import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: "true",
  });
});

app.listen(3000, (err) => (err ? console.log(err) : console.log("Server OK")));
