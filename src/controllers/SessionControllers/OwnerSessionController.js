// index, show, store, update, destroy
const Owner = require('../../models/Owner');
module.exports = {
    

    async show(req, res) {
        const { email, password } = req.body;

        let owner = await Owner.findOne({ email });
        if(!owner){
            return res.status(400).json({error: 'No user found'});
        }

        owner.comparePassword(password, function(err, isMatch) {
            if (isMatch && isMatch == true){
                return res.json(owner); // -&gt; 123Password: false
            } else{
                return res.status(400).json({error: 'Wrong password'});
            }
            
        });

        //return res.status(400).json({error: 'Wrong password'});

        

        
        

        
    }
};