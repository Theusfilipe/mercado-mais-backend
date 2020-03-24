const mongoose = require('mongoose');

var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

const ClientSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    dateEntry:String,

    cep: String,
    city: String,
    state: String,
    address: String,
    addressNumber: String,

    confirmed: Boolean
    
});

ClientSchema.pre('save', function(next) {
    var client = this;

    // only hash the password if it has been modified (or is new)
    if (!client.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(client.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            client.password = hash;
            next();
        });
    });
});



ClientSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Client', ClientSchema);