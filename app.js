const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes"));
app.use(require("./middleware/error.handler"));

app.listen(8080, () => {
  console.log("lisetening on port 8080");
});
