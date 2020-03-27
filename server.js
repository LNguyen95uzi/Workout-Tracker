const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// Routes can go here...
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body, function (err, data) {
        if (err)
            throw err;

        res.send(data)
    })
})

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { exercises: req.body } }, function (err, data) {
        if (err)
            throw err;

        res.send(data)
    })
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
        }
    })
})

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(exercise => {
            res.json(exercise);
        })
        .catch(err => {
            res.json(err);
        });
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});