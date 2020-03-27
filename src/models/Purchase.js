const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;  

const PurchaseSchema = new mongoose.Schema({
    _id: ObjectID,
    total:Number, //MUDAR!
      //MUDAR!
    
    freight:Number, //MUDAR!
    dateEntry:Date,
    bought:Boolean,
    delivered:Boolean,

    cep: String,
    city: String,
    state: String,
    district: String,
    address: String,
    addressNumber: String,
    

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