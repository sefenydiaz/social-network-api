const { Schema, model, Types } = require("mongoose");
const date = require("../utils/date")

const thought = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => date(createdAtVal),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reaction],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

const reaction = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => date(createdAtVal),
    },
},
{
    toJSON: {
        getters: true,
    },
}
);

thought.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thought);

module.exports = Thought;