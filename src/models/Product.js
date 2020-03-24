const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const ProductSchema = new mongoose.Schema({
    
    id:Number,
    name:String,
    price:Number, //Mudar!
    quantity:Number,
    dateEntry:String,
    thumbnail : String,
    type: String,
    subType: String,
    active:Boolean,
    //expDate:Date,
    market:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Market'
    }
}, {
    toJSON :{
        virtuals: true
    },
});

ProductSchema.virtual('thumbnail_url').get(function(){
    return  `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Product', ProductSchema);