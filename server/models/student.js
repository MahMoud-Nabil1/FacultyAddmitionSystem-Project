const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    sid: {
        type: Number,
        required: [true, 'Student ID is required'],
        unique: true
    },

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    hash: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: true
    },

    gpa: {
        type: Number,
        default: 0.0
    },

    completedSubjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    ],

    requestedSubjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subjects'
        }
    ],

    department: {
        type: Schema.Types.ObjectId,
        ref: 'Departments'
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };