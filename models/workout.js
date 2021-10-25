const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  workout_type: {
    type: String,
    trim: true,
    required: "Select exercise type",
    choices: ["Resistance", "Cardio"]
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;