const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
      },
    { timestamps: true }
);

const User = mongoose.model('users', userSchema);

module.exports = User;