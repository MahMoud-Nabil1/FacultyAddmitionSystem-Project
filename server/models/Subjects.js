import mongoose from 'mongoose';

const Subjects = mongoose.model('Subjects', {
    id: String,
    name: String,
    prerequisites: Array,
    creditHours: Number
});

export default Subjects;