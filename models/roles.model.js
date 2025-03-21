const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // Example: 'admin', 'editor'
      },
    { timestamps: true }
);

const Role = mongoose.model('roles', roleSchema);

module.exports = Role;