const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add customer
router.put('/', async (req, res) => {
  const { fullName, email, birthDate, notes, createdOn } = req.body;
  try {
    const newCustomer = new Customer({
      fullName,
      email,
      birthDate,
      notes,
      createdOn,
    });
    const customer = await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit customer details
router.post('/:id', async (req, res) => {
  const { fullName, email, birthDate, notes } = req.body;

  // Build Customer object
  const customerFields = {};
  if (fullName) customerFields.fullName = fullName;
  if (email) customerFields.email = email;
  if (birthDate) customerFields.birthDate = birthDate;
  if (notes) customerFields.notes = notes;

  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ msg: 'Customer not found' });

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: customerFields },
      { new: true }
    );

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    await Customer.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
