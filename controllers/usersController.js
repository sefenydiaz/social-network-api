const { Thought, User } = require("../models");

const usersController = {
    getUsers(req, res) {
        User.find({})
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .sort({ _id: -1 })
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    userById(req, res) {
        User.findOne({ _id: req.params.id })
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true})
        .then((userData) => {
            if (!userData) {
                res.status(404).json({
                    message: "This user does not exist.",
                });
            } else {
                res.status(200).json({
                    message: "This user has successfully been updated!",
                    user: userData,
                });
            }
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        })
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({
                    message: "This user does not exist.",
                });
            }
            Thought.deleteMany({username: userData.username})
            .then((result) => {
                res.status(200).json({
                    message: "This user has successfully been deleted!",
                });
            })
            .catch((thoughtsErr) => {
                res.status(500).json({
                    message: "Error! Thoughts were not successfully deleted."
                });
            });
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },

    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $push: {friends: req.params.friendId }},
            { new: true }
        )
        .then((friendData) => {
            if (!friendData) {
                res.status(404).json({
                    message: "This user does not exist.",
                });
            } else {
                res.status(200).json({
                    message: "Friend added successfully!",
                    user: friendData,
                });
            }
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        })
    },

    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
        .then((friendData) => {
            if (!friendData) {
                res.status(404).json({
                    message: "This user does not exist.",
                });
            } else {
                res.status(200).json({
                    message: "Friend deleted successfully!",
                    user: friendData,
                });
            }
        })
        .catch((err) => {
            console.log("Error! ", err);
            res.status(500).json(err);
        });
    },
};

module.exports = usersController;