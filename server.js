const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

const databaseUrl = "workout_tracker";
const collections = ["exercise"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.post("/submit", (req, res) => {
  console.log(req.body);

  db.exercise.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.get("/all", (req, res) => {
  db.exercise.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/find/:id", (req, res) => {
  db.exercise.findOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.post("/update/:id", (req, res) => {
  db.exercise.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        title: req.body.title,
        note: req.body.note,
        modified: Date.now()
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// app.delete("/delete/:id", (req, res) => {
//   db.exercise.remove(
//     {
//       _id: mongojs.ObjectID(req.params.id)
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });

// app.delete("/clearall", (req, res) => {
//   db.exercise.remove({}, (error, response) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(response);
//     }
//   });
// });

app.listen(3000, () => {
  console.log("App running on port 3000!");
});