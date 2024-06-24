const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    totalBilled: {
        type: Number,
        required: true,
        default: 0
    },
    totalPayed: {
        type: Number,
        required: true,
        default: 0
    },
    Deficit: {
        type: Number,
        required: true,
    }
})

billSchema.pre('save', function(){
    this.Deficit = this.totalBilled - this.totalPayed;
    next();
})

module.exports = mongoose.model(
    'Bills',billSchema
)