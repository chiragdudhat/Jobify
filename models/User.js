import mongoose from "mongoose";
import validator from "validator";
const UserSchema = new mongoose.Schema({
    name: {
        String, 
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },
    password: {
        String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    lastName: {
        String,
        trim:true, 
        maxlength: 20,
        default: 'lastName'
    },
    location: {
        String,
        maxlength: 20,
        trim: true,
        default: 'my city'
    }
})

export default mongoose.model('User', UserSchema)