import mongoose from 'mongoose';

const Subjects = mongoose.model('Subjects', {
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    prerequisites: {
        type: Array
    },
    creditHours: {
        type: Number,
        requirejs: true
    }
});

export default Subjects;