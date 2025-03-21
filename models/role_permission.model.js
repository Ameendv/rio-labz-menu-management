const mongoose = require('mongoose');


const rolePermissionSchema = new mongoose.Schema(
    {
        role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
        permission: { type: mongoose.Schema.Types.ObjectId, ref: "permissions" },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
    { timestamps: true }
);

const RolePermission = mongoose.model('role_permission', rolePermissionSchema);

module.exports = RolePermission;