const express = require('express');
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3002;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    });

app.use(require("./routes/api_route"));
app.use(require("./routes/html_route"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});