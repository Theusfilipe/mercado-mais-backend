const User = require('../models/TestModels/User');
const CreditCard = require('../models/CreditCard');


module.exports = {
    async index(req, res){
        const { user } = req.query;

        const cards = await CreditCard.find({ cards: user});

        return res.json(cards);
    },

    async store (req, res){
        //const { filename } = req.file;
        const { number, secNumber, dateEntry, owner,expDate } = req.body;
        const { user_id } = req.headers;
        //console.log(owner_id);
        const user = await User.findById(user_id);
        
        if(!user){
            return res.status(400).json({error: 'User doesnt exist'});

        }

        const creditCard = await CreditCard.create({
            user:user_id,
            number,
            secNumber,
            owner, 
            dateEntry,
            expDate
            
        });

    

        return res.json(creditCard);
    }
    
};