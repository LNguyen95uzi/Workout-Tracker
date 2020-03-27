const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        default: Date.now(),
        type: Date
    }, 
    exercises: [
        {
            type: {
                type:String, 
                required: true
            },
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number, 
                required: true
            }, 
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ]
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
