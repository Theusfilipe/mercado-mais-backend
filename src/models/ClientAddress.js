const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;


const ClientAdressSchema = new mongoose.Schema({
    
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },

    cep: String,
    city: String,
    state: String,
    district: String,
    address: String,
    addressNumber: String,
    

    
    
});



module.exports = mongoose.model('ClientAdress', ClientAdressSchema);