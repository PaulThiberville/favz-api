const http = require("http");
const PORT = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/favico.ico", (req, res) => {
  res.sendStatus(404);
});

app.post("/", controller.getInfos);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT}`);
});
