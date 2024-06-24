const User = require('../../Schemas/user')

const getAllUsers = async (_, res) => {
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch (error){
        res.status(500).json({message: error.message})
    }

}

module.exports = getAllUsers;