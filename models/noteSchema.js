import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add Title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.models.mynote || mongoose.model('mynote', noteSchema);