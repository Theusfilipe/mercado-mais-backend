const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;  

const PurchaseSchema = new mongoose.Schema({
    _id: ObjectID,
    total:Number, //MUDAR!
    address:String, //MUDAR!
    freight:Number, //MUDAR!
    dateEntry:Date,
    bought:Boolean,
    delivered:Boolean,
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    market:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Market'
    },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);