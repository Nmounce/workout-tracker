const mongoose = require("mongoose");
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  id: {
    type: DataType.Integer,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  workout_type: {
    type: String,
    trim: true,
    required: "Select exercise type",
    choices: ["Resistance", "Cardio"]
  }
  // },
  //   {
  //     sequelize,
  //     timestamp: true,
  //     freezeTableName: true,
  //     underscored: true,
  //     modelName: "workout"
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;