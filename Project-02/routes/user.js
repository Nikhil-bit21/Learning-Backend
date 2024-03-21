const express = require("express");
const {
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handleDeleteUserById,
    handelCreateNewUser,
} = require('../controllers/user')

const router = express.Router();

router.route('/').get(handelGetAllUsers).post(handelCreateNewUser);

router
    .route('/:id')
    .get(handelGetUserById)
    .patch(handelUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;