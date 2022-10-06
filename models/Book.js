const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = mongoose.Schema({
    id: {type: mongoose.Types.ObjectId, required: true},

    bookName: {type: String, required: true, unique: true, trim:true,height:30, 
        validate: {
            validator: v=> v.charAt(0) == v.charAt(0).toUpperCase(),
            message: (pops) => "Le premier caractère du nom doit être en majuscule"
        }
    },
    price: {type: Double, required: true, trim: true, minlength:1, maxlength:5},
    stock: {type: Integer, required: true, trim: true, minlength:1, maxlength:5},
    ISBN: {type: String, required: true, trim: true, minlength:10, maxlength:13},
    pageCount: {type: Integer, required: true, trim: true, minlength:1, maxlength:5},
})

bookSchema.plugin(uniqueValidator) 
module.exports = mongoose.model('Book', bookSchema)