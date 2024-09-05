import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    },
    coverImg: {
        type: String,
        default: "https://twirpz.wordpress.com/wp-content/uploads/2015/06/twitter-avi-gender-balanced-figure.png"
    },
    profileImg: {
        type: String,
        default: ""
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    bio: {
        type: String,
        default: ""
    }
})

const User = mongoose.model("User", userSchema)
export default User