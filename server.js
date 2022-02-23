const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

mongoose
  .connect(config.db.uri)
  .then(() => {
    console.log("connect db success!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database ", err);
    process.exit();
  });

const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
