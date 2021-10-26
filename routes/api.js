const {
    resourceLimits
} = require('worker_threads');
const db = require('../models');
const router = require('express').Router();

//get all workouts
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            const total = 0;
            workout.activities.forEach(a => {
                total += a.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

//create a new workout
router.post("/api/workouts", ({
    body
}, res) => {
    // console.log(body);
    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

//add an activity
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({
        _id: req.params.id
    }, {
        $inc: {
            totalDuration: req.body.duration
        },
        $push: {
            exercises: req.body
        }
    }, {
        new: true
    }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

//get workout data in specific date range
router.get("/api/workouts/data", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        console.log("All Workouts");
        console.log(dbWorkout);
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;