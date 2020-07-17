const Topic = require('../models/topic');

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const topics = await Topic.find({ user: req.user._id }).populate('user');
    res.status(200).json(topics);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  req.body.user = req.user._id;
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json(err);
  }
}