const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    min: 0,
  },
  price_each: {
    type: Number,
    min: 0,
  },
  total_price: {
    type: Number,
    min: 0,
  }
});

const invoiceSchema = new Schema({
  invoice_num: {
    type: Number,
    unique: true,

  },
  name: {
    type: String,
  },
  items: {
    type: [itemSchema],
  },
  total_price: {
    type: Number,
    min: 0,
  },
  company_name: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

invoiceSchema.pre("validate", async function (next) {
  if (!this.invoice_num) {
    try {
      const lastInvoice = await mongoose.model('Invoice').findOne().sort({ invoice_num: -1 });
      this.invoice_num = lastInvoice ? lastInvoice.invoice_num + 1 : 100;
    } catch (error) {
      return next(error);
    }
  }
  this.items.forEach(item => {
    item.total_price = item.quantity * item.price_each;
  });
  this.total_price = this.items.reduce((sum, item) => sum + item.total_price, 0);
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;