const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    id: {type: mongoose.Types.ObjectId, required: true},
    userName: {type: String, required: true, unique: true, trim:true, length:30, 
        validate: {
            validator: v=> v.charAt(0) == v.charAt(0).toUpperCase(),
            message: (pops) => "Le premier caractère du nom doit être en majuscule"
        }
    },
    email: { type: String, required: true, unique: true, trim:true, length:50},
    password: {type: String, required: true, trim: true, minlength:5, length:50},
    isAdmin: {type: Boolean, required: true}
    // roleId: {type: [String], enum : ["Trader", "Admin"]}
})

module.exports = mongoose.model('User', userSchema)