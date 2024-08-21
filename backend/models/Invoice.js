const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  invoice_num: {
    type: Number,
    unique: true,
  },
   date: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("invoice", invoiceSchema);
module.exports = Invoice;