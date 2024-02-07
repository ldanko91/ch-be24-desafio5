import mongoose from "mongoose";

const usersCollection = 'user'

const usersSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'usuario'
    }

})

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel;