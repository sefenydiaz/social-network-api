const { Schema, model } = require("mongoose");
const thought = require("./Thought");

const user = new Schema({
    username: {
        type: String,
        unique: [true, "Sorry! That username is already registered!"],
        required: [true, "Please enter a valid username!"],
        trim: true
    },

    email: {
        type: String,
        unique: [true, "Sorry! That email is already registered!"],
        required: [true, "Please enter a valid email!"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email!",

        ],
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    },],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    },],
},
{
    toJSON: {
        virtuals: true
    },
    id: false,
});

const User = model("User", user);

user.virtual("friendCount").get(function(){
    return this.friends.length;
});

module.exports = User;