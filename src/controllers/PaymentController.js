const MercadoPago = require('mercadopago');



const MP_ACCESS_TOKEN="TEST-138604221212487-031019-b891e60f7c057c7b0b0670f5e7190f9e-534737559";



const getFullUrl = (req) =>{
    const url = req.protocol + '://' + req.get('host');
    console.log(url)
    return url;
}

module.exports = {
    
    async checkout(req, res){

        //console.log(process.env)
        MercadoPago.configure({
            sandbox: true,
            access_token: MP_ACCESS_TOKEN
        });

        const { id, email, description, amount } = req.params;

        //Create purchase item object template
        const purchaseOrder = {
            items: [
              item = {
                id: id,
                title: "Meu Produto",
                description : description,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(amount)
              }
            ]
            ,
            payer : {
              email: email
            },/*
            auto_return : "all",
            external_reference : id,
            back_urls : {
              success : getFullUrl(req) + "/payments/success",
              pending : getFullUrl(req) + "/payments/pending",
              failure : getFullUrl(req) + "/payments/failure",
            }*/
          }
      
        console.log(purchaseOrder);
          //Generate init_point to checkout
          try {
            const preference = await MercadoPago.preferences.create(purchaseOrder);
            console.log(preference);
            return res.redirect(`${preference.body.init_point}`);
          }catch(err){
            return res.send(err.message);
          }
    }
}