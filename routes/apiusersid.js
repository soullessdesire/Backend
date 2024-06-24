// imports
const express = require('express');
const router = express.Router();
const getAllUsers = require('../controllers/Id/getAllUsers');
const getUser = require('../controllers/Id/getUser');
const updateUser = require('../controllers/Id/updateUser');
const deleteUser = require('../controllers/Id/deleteUser');



//apis for the directory /api/users/id
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

//export
module.exports = router; 