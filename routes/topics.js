const router = require('express').Router();
const topicsCtrl = require('../controllers/topics');

router.get('/', checkAuth, topicsCtrl.index);

function checkAuth(req, res, next) {
  if(req.user) return next();
  return res.status(501).json({msg: 'Not Authorized to view this page'});
}

module.exports = router;