const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(501).json({ err: 'Invalid email/password combination' });
    foundUser.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(foundUser);
        res.json({ token })
      } else {
        return res.status(501).json({ err: 'Invalid email/password combination' });
      }
    })
  } catch (err) {
    return res.status(501).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  const token = jwt.sign({ user }, SECRET, { expiresIn: '24h' });
  return token;
}