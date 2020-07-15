const Topic = require('../models/topic');

module.exports = {
  index,
};

async function index(req, res) {
  try{
    const topics = await Topic.find({user: req.user._id}).populate('user');
    res.status(200).json(topics);
  }
  catch(err){
    res.status(500).json(err);
  }
}