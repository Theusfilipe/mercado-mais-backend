// index, show, store, update, destroy
const Client = require('../../models/Client');
module.exports = {
    

    async show(req, res) {
        const { email, password } = req.body;

        let client = await Client.findOne({ email });

        client.comparePassword(password, function(err, isMatch) {
            if (isMatch && isMatch == true){
                return res.json(client); // -&gt; 123Password: false
            } else{
                return res.status(400).json({error: 'Wrong password'});
            }
            
        });

        //return res.status(400).json({error: 'Wrong password'});

        

        
        

        
    }
};