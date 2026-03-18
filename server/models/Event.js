const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Event', EventSchema);