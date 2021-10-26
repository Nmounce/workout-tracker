const db = require('../models');

module.exports = function(app) {

    //get last workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
        }).catch(err => {
            res.json(err);
        });
    });

    //create a new workout
    app.post("/api/workouts", ({
        body
    }, res) => {
        // console.log(body);
        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    //add an exercise to a workout
    router.put("/api/workouts/:id", ({body, params}, res) => {
        console.log(body, params);
        const workoutId = params.id;
        let savedExercises = [];

        //get all saved exercises in current workout
        db.Workout.find({ id: workoutId })
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises);
                updateWorkout(allExercises)
            }).catch(err => {
                res.json(err);
            });

    //get workout data in specific date range
    router.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            console.log("All Workouts");
            console.log(dbWorkout);
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

