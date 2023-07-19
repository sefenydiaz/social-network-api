const router = require('express').Router();

const {
    getUsers,
    userById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usersController');

// GET and POST for users
router.route('/').get(getUsers).post(createUser);

//GET and PUT and DELETE for a single user
router.route('/:id').get(userById).put(updateUser).delete(deleteUser);

// POST(add) friend and DELETE friend
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);



module.exports = router;