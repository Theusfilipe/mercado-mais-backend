const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    name:String,
    thumbnail : String,
    plan:String, //Mudar!
    dateEntry:String,
    address:String,
    cnpj:String,

    cep: String,
    city: String,
    state: String,
    addressNumber: String,

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    }
}, {   
        toJSON :{
            virtuals: true
        },
});

MarketSchema.virtual('thumbnail_url').get(function(){
    return  `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Market', MarketSchema);


