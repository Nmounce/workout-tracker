const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "Enter an exercise type"
    },
    name: {
      type: String,
      trim: true,
      required: "Enter the exercise name"
    },
    duration: {
      type: Number,
      required: "Enter the exercise duration in minutes"
    },
    weight: {
      type: Number,
      default: 0
    },
    reps: {
      type: Number,
      default: 0
    },
    sets: {
      type: Number,
      default: 0
    },
    distance: {
      type: Number,
      default: 0
    }
  }]
}, {
  toJSON: {
    virtual: true,
  }
});

//add a dynamically created property to the schema object
// workoutSchema.virtual("totalDuration").get(function () {
//   return this.exercises.reduce((total, exercise) => {
//     return total + exercise.duration;
//   }, 0);
// });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;