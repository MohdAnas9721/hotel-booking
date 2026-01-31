const { url } = require("inspector");
const mongoose = require("mongoose");
const { type } = require("os");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
    image: { 
      filename: { 
        type: String, 
        default:"listingimage",
      }, 
      url: { 
        type : String, 
        default:"https://unsplash.com/photos/a-festive-christmas-tree-in-a-snowy-village-IAmsgM5RUFc",
      }
    },
  price: Number,
  location: String,
  country: String, 
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
