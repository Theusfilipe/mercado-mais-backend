// index, show, store, update, destroy
const Client = require('../models/Client');

var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;


module.exports = {
    async index(req, res){
        //const { tech } = req.query;

        const client = await Client.find();

        return res.json(client);
    },

    async update(req, res){
        //const { tech } = req.query;

        
        const { email, name, cep, city, state, address, addressNumber  } = req.body;

        const client = await Client.findOne({ email });

        client.name = name;

        client.cep = cep;
        client.city = city;
        client.state = state;
        client.addressNumber = addressNumber;
        client.address = address;
        

        
        

        

        await client.save();
        
        return res.json(client);
    },

    async show(req, res){
        const { client_id } = req.headers;

        const client = await Client.find({ _id: client_id });

        return res.json(client);
    },

    async store(req, res) {
        const { email, password, name, cep, city, state, address, addressNumber } = req.body;
        var confirmed = false;
        let client = await Client.findOne({ email });

        const dateEntry = new Date();
        //let cpf_find = await Owner.findOne({cpf});

        
        //if(cpf_find){
        //    return res.status(400).json({error: 'User exists'});
        //
        //}
        

        if(!client /*&& !cpf_find*/) {
            console.log(req.body);
            client = await Client.create({
                name,
                email,
                password,
                dateEntry,

                cep,
                city,
                state,
                address,
                addressNumber,

                confirmed
                
            });
            return res.json(client);

        }
        

        
    }
};