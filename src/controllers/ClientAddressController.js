// index, show, store, update, destroy
const Client = require('../models/Client');
const ClientAddress = require('../models/ClientAddress');


var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;


module.exports = {
    async index(req, res){
        const { client } = req.query;

        //console.log(client);

        const clientAddress = await ClientAddress.find({client : client});

        return res.json(clientAddress);
    },

    async update(req, res){
        //const { tech } = req.query;

        
        const { client, cep, city, state, address, addressNumber, district  } = req.body;

        const ClientAddress = await ClientAddress.findOne({ client });

        

        clientAddress.cep = cep;
        clientAddress.city = city;
        clientAddress.state = state;
        clientAddress.addressNumber = addressNumber;
        clientAddress.address = address;
        clientAddress.district = district;
        

        
        

        

        await client.save();
        
        return res.json(clientAddress);
    },

    async show(req, res){
        const { clientaddressid } = req.headers;
        
        const clientAddress = await ClientAddress.find({ _id: clientaddressid });

        return res.json(clientAddress);
    },

    async destroy(req, res){
        const { addressid } = req.headers;

        const address = await ClientAddress.findOneAndDelete({ _id: addressid});

        return res.json(address);
        
    },

    async store(req, res) {
        const { _id,  cep, district, city, state, address, addressNumber } = req.body;
        
        let client = await Client.findOne({_id});

        //console.log(client);

        

        const dateEntry = new Date();
        //let cpf_find = await Owner.findOne({cpf});

        
        //if(cpf_find){
        //    return res.status(400).json({error: 'User exists'});
        //
        //}
        

        if(client /*&& !cpf_find*/) {
            
            clientAddress = await ClientAddress.create({
                client : client._id,
                cep,
                city,
                state,
                address,
                addressNumber,
                district,

                
                
            });
            
            return res.json(clientAddress);

        }
        else{
            return console.log("Client doesn't exist");
        }
        

        
    }
};