const express = require("express");
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const logger = require("./logger");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const port = config.port;

mongoose
	.connect(config.mongoURI, config.mongoConfig)
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("combined", { stream: logger.stream }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static("client/build"));

app.use("/api/user", require("./routes/user"));
app.use("/api/artist", require("./routes/artist"));
app.use("/api/prod", require("./routes/prod"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/ent", require("./routes/ent"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/favorite", require("./routes/favorite"));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
