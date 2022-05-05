
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    account: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
},
{timestamps: true}
);

userSchema.pre('save', function(next) {
    if(!this.isModified("password")) return next();
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})


userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}


const Users = mongoose.model('user', userSchema);

module.exports = Users;