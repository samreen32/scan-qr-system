const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Invoice = require("../models/Invoice");

/****** 1st Route *******/
// Create an Invoice using: POST "api/invoice/createInvoice". No login required.
router.post(
  "/createInvoice",
  [
    body("quantity").optional().isNumeric().withMessage("Quantity must be a number"),
    body("price_each").optional().isNumeric().withMessage("Price each must be a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, items, company_name, address } = req.body;
      const invoice = new Invoice({
        name,
        items,
        company_name,
        address,
      });

      const savedInvoice = await invoice.save();
      res.json(savedInvoice);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/****** 2nd Route *******/
// Fetch all Invoices using: GET "api/invoice/fetchInvoices". No login required.
router.get("/fetchInvoices", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/****** Delete Invoice Route *******/
// Delete an Invoice using: DELETE "api/invoice/deleteInvoice/:id". No login required.
router.delete("/deleteInvoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    const deleteInvoice = await Invoice.findByIdAndDelete(req.params.id);
    res.json({ deleteInvoice, msg: "Invoice deleted successfully" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    res.status(500).send("Server Error");
  }
});

/****** Fetch Single Invoice Route *******/
// Fetch a single Invoice using: GET "api/invoice/getInvoice/:id". No login required.
router.get("/getInvoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;