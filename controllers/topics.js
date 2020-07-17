const Topic = require('../models/topic');

module.exports = {
  index,
  create,
  update,
  delete: deleteOne
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

async function update(req, res) {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedTopic);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteOne(req, res) {
  try {
    const deletedTopic = await Topic.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedTopic);
  } catch (err) {
    res.status(500).json(err);
  }
}