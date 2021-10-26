const db = require('../models');

module.exports = function (app) {

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
    app.post("/api/workouts", async (req, res) => {
        try {
            const response = await db.Workout.create({
                type: "workout"
            })
            res.json(response);
        } catch (err) {
            console.log("An error occurred while creating your workout", err);
        }
    })

    //add an exercise to a workout
    app.put("/api/workouts/:id", ({
        body,
        params
    }, res) => {
        console.log(body, params);
        const workoutId = params.id;
        let savedExercises = [];

        //get all saved exercises in current workout
        db.Workout.find({
                id: workoutId
            })
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises);
                updateWorkout(allExercises)
            }).catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises) {
            db.Workout.findByIdAndUpdate(workoutId, {
                exercises: exercises
            }, function (err, doc) {
                if (err) {
                    console.log(err);
                }
            })
        }
    })
    //get workout data in specific date range
    router.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            }).catch(err => {
                res.json(err);
            });
    });
};