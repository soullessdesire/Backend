const User = require('../../Schemas/user');

const getUser = async (req,res) => {
    try{
        const {username} = req.params;
        const user = await User.find({username})
        res.status(200).send(user)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = getUser;
