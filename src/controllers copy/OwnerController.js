// index, show, store, update, destroy
const Owner = require('../models/Owner');

var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;


module.exports = {
    async index(req, res){
        //const { tech } = req.query;

        const owner = await Owner.find();

        return res.json(owner);
    },

    async update(req, res){
        //const { tech } = req.query;

        
        const { email, name, cpf, phone, rg , docEmiter } = req.body;

        const owner = await Owner.findOne({ email });

        owner.name = name;
        owner.cpf = cpf;
        owner.phone = phone;

        owner.rg = rg;
        owner.docEmiter = docEmiter;
        

        

        await owner.save();
        
        return res.json(owner);
    },

    async show(req, res){
        const { user_id } = req.headers;

        const owner = await Owner.find({ user: user_id });

        return res.json(owner);
    },

    async store(req, res) {
        const { email, name, cpf, phone, password, dateEntry } = req.body;

        let user = await Owner.findOne({ email });
        //let cpf_find = await Owner.findOne({cpf});

        
        //if(cpf_find){
        //    return res.status(400).json({error: 'User exists'});
        //
        //}
        

        if(!user /*&& !cpf_find*/) {
            console.log(req.body);
            owner = await Owner.create({
                cpf,
                email,
                name,
                phone,
                password,
                dateEntry
            });
            return res.json(owner);

        }
        

        
    }
};