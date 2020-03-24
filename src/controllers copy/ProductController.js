const Product = require('../models/Product');
const Market = require('../models/Market');


module.exports = {
    async show(req, res){
        const { product_id } = req.headers;

        const product= await Product.find({ _id: product_id });

        return res.json(product)
    },

    async index(req, res){
        const { market , type } = req.query;

        const products = await Product.find({market : market, type : type});

        return res.json(products);
    },

    async store (req, res){
        const { filename } = req.file;
        const { name, price, dateEntry, quantity, type, subType } = req.body;
        const { market_id } = req.headers;
        //console.log(owner_id);
        const market = await Market.findById(market_id);
        
        if(!market){
            return res.status(400).json({error: 'Market doesnt exist'});

        }

        const product = await Product.create({
            market:market_id,
            name,
            thumbnail: filename,
            price,
            dateEntry,
            quantity,
            type,
            subType
            
        });

        return res.json(product);
    }
    
};