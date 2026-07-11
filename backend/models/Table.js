const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
{
    tableNumber:{
        type:Number,
        required:true,
        unique:true
    },

    capacity:{
        type:Number,
        required:true,
        min:1
    },

    location:{
        type:String,
        enum:["Indoor","Outdoor","VIP"],
        default:"Indoor"
    },

    status:{
        type:String,
        enum:["Available","Reserved","Maintenance"],
        default:"Available"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Table",tableSchema);