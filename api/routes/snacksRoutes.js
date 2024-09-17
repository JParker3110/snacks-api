const express = require('express');
const router = express.Router();
const snacksController = require('./controllers/snacksController'); 

// Define routes here
router.get('/', snacksController.getAllSnacks);
router.post('/', snacksController.createSnack);
router.put('/:id', snacksController.updateSnack);
router.delete('/:id', snacksController.deleteSnack);

module.exports = router;
