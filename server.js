const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

// Middleware for BodyParser
// body-parser: extract the entire body portion of incoming request and exposes it on request.body
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
// MongoDB config og connection
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/purchase", require("./routes/api/purchase"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000; // Sets port for server

app.listen(port, () => console.log(`Server started on port ${port}`));
