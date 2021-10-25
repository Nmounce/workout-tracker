const Workout = require('./workout');
const Cardio = require('./cardio');
const Resistance = require('./resistance');

Cardio.belongsto(Workout, {
    foreignKey: 'workout_id'
});

Resistance.belongsto(Workout, {
    foreignKey: 'workout_id'
});

module.exports = {
    Workout,
    Cardio,
    Resistance
};