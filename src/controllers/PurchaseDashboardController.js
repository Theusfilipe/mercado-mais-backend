const Purchase = require('../models/Purchase');
const Client = require('../models/Client');
const Market = require('../models/Market');


module.exports = {
    async show(req, res){
        const { purchase_id } = req.headers;

        const purchase = await Purchase.find({ _id: purchase_id });

        return res.json(purchase);
    },

    async index(req, res){
        const { market_id } = req.query;

        const purchases = await Purchase.find({ market: market_id });

        return res.json(purchases);
    },

    async store (req, res){
        //const { filename } = req.file;
        const { address, addressNumber, freight, cep, city, state, district, dateEntry} = req.body;
        const { client_id, market_id } = req.headers;
        //console.log(owner_id);
        const client = await Client.findById(client_id);
        const market = await Market.findById(market_id);
        
        if(!client){
            return res.status(400).json({error: 'Client doesnt exist'});

        }

        if(!market){
            return res.status(400).json({error: 'Market doesnt exist'});
        }

        const purchase = await Purchase.create({
            client:client_id,
            total:0,
            address,
            addressNumber,
            cep,
            city,
            state,
            district,
            freight, 
            dateEntry,
            bought:false,
            delivered:false,
            market:market_id
            
            

        });

        return res.json(purchase);
    },

    
    
};