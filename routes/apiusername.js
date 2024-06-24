// imports
const express = require('express')
const getAllUsers = require('../controllers/userName/getAllUsers');
const getUser = require('../controllers/userName/getUser');
const updateUser = require('../controllers/userName/updateUser');
const deleteUser = require('../controllers/userName/deleteUser');
const createUser = require('../controllers/userName/createUser');
const router = express.Router()
// const checkNotAuthenticated = require('../authFuncs/checkNotAuthenticated')



//apis for the directory api/user/userName
router.post('/',createUser)
router.get('/',getAllUsers);
router.get('/@:username', getUser)
router.put('/@:username', updateUser)
router.delete('/@:username', deleteUser)


module.exports = router