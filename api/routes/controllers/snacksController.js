// controllers/snacksController.js

const getAllSnacks = (req, res) => {
    res.status(200).json({ snacks: [] });
  };
  
  const createSnack = (req, res) => {
    res.status(201).json(req.body);
  };
  
  const updateSnack = (req, res) => {
    res.status(200).json({ id: req.params.id, ...req.body });
  };
  
  const deleteSnack = (req, res) => {
    res.status(204).send();
  };
  
  module.exports = {
    getAllSnacks,
    createSnack,
    updateSnack,
    deleteSnack,
  };
  