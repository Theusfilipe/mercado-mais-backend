const express = require('express');
const routes = express.Router();

const paymentsController = require('../controllers/paymentsController');

routes.get('/checkout/:id/:email/:description/:amount', paymentsController.checkout)

routes.get('/success', (req, res) => {
    return res.statusMessage = "Success";
})

routes.get('/pending', (req, res) => {
    return res.statusMessage = "Pending";
})

routes.get('/failure', (req, res) => {
    return res.statusMessage = "Failure";
})

module.exports = routes;