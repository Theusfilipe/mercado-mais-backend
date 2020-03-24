const Market = require('../models/Market');

module.exports = {
    async show(req, res){
        const { owner_id } = req.headers;

        const markets = await Market.find({ owner: owner_id });

        return res.json(markets);
    }
    
};