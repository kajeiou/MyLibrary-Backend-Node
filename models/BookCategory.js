const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const bookCategorySchema = mongoose.Schema({
    id: {type: mongoose.Types.ObjectId, required: true},

    bookCategoryName: {type: String, required: true, unique: true, trim:true,height:30, 
        validate: {
            validator: v=> v.charAt(0) == v.charAt(0).toUpperCase(),
            message: (pops) => "Le premier caractère du nom doit être en majuscule"
        }
    },
})

bookSchema.plugin(uniqueValidator) 
module.exports = mongoose.model('Book', bookSchema)