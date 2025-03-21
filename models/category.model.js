const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema(
    {
        category: { type: String, required: true, unique: true }, 
        parent_category_id:{ type: mongoose.Schema.Types.ObjectId, ref: "category", default: null }
      },
    { timestamps: true }
);

const Category = mongoose.model('category', categorySchema);

module.exports = Category;