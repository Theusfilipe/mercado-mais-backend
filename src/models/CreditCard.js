const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({//MUDAR! Deixar mais seguro, embaralhar as informações
    id:Number,
    number:String,
    secNumber:String,
    owner:String,
    expDate:String,
    dateEntry:String,
    CPF:String,
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

module.exports = mongoose.model('CreditCard', CreditCardSchema);