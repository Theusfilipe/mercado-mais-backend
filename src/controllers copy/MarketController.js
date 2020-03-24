const Owner = require('../models/Owner');
const Market = require('../models/Market');


module.exports = {
    async index(req, res){
        //const { tech } = req.query;

        const markets = await Market.find();

        return res.json(markets);
    },

    async update(req, res){
        //const { tech } = req.query;

        const {market_id} = req.headers;
        const { name, plan, address, cnpj, cep, city, state, addressNumber } = req.body;

        const market = await Market.findOne({ _id: market_id });

        market.name = name;
        
        market.plan  =  plan;
        
        market.address = address;
        market.cnpj  = cnpj;

        market.cep  = cep;
        market.city  = city;
        market.state  = state;
        market.addressNumber =  addressNumber;
        

        await market.save();
        
        return res.json(market);
    },

    async store (req, res){
        const { filename } = req.file;
        const { name, plan, dateEntry, address, cnpj } = req.body;
        const { owner_id } = req.headers;
        //console.log(owner_id);
        const owner = await Owner.findById(owner_id);
        
        if(!owner){
            return res.status(400).json({error: 'Owner doesnt exist'});

        }

        const market = await Market.create({
            owner:owner_id,
            name,
            thumbnail: filename,
            plan, //Mudar!
            dateEntry,
            address,
            cnpj
            
        });

        return res.json(market);
    }
    
};