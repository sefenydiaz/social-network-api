const { Thought, User } = require("../models");

const thoughtsController = {
    getThoughts(req, res) {
        Thought.find({})
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    thoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then((thoughtData) => {
            !thoughtData
            ? res.status(404).json({
                message: "This thought does not exist!",
            })
            : res.json(thoughtData);
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtData) => {
            return User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thoughtData._id }},
                { new: true }
            );
        })
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {
            new:true,
            runValidators: true,
        })
        .then((updated) => {
            if (!updated) {
                return res.status(404).json({ message: "This thought does not exist!"});
            } else {
                res.json(updated);
            }
        })
        .catch((err) => res.json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((thoughtData) => {
            !thoughtData
            ? res.status(404).json({
                message: "This thought does not exist!",
            })
            : res.status(200).json({
                message: "Thought deleted successfully!",
            });
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, 
            runValidators: true }
        )
        .then((thoughtData) => {
            !thoughtData
            ? res.status(404).json({ 
                message: "This thought does not exist!",
            })
            : res.status(200).json({
                message: "Reaction successfully created!",
                thoughtData,
            });
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}}
        )
        .then((thoughtData) => {
            !thoughtData
            ? res.status(404).json({
                message: "This thought does not exist!",
            })
            : res.status(200).json({
                message: "Reaction deleted successfully!"
            });
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtsController;