const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    applications: [
        {
            name: String,
            locked: Boolean,
            unlock_date: String,
            current_password: String
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;