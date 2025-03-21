const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // Example: 'edit_posts', 'view_reports'
      },
    { timestamps: true }
);

const Permission = mongoose.model('permissions', permissionSchema);

module.exports = Permission;