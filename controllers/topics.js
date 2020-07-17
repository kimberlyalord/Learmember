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
  console.log('controller');
  console.log(req.body);
  req.body.user = req.user._id;
  console.log(req.body.user);
  try {
    const topic = await Topic.create(req.body);
    console.log(topic);
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json(err);
  }
}