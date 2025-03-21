const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema(
    {
        food_name: { type: String, required: true, unique: true }, 
        category_id:{ type: mongoose.Schema.Types.ObjectId, ref: "category" },
        price:{ type: Number, required: true },
        description:{ type: String, required: true },
      },
    { timestamps: true }
);

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;