const User = require('../../Schemas/user');

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        await User.findByIdDelete(id)
        res.status(200).send('User is deleted')
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


module.exports = deleteUser;