const Users = require('../models/user');
const { options } = require('../routes/users');

module.exports.postUser = (req, res) => {
  const {name, about, avatar} = req.body;
  Users.create({name, about, avatar})
   .then(user => res.send({data: user}))
   .catch(err => console.log('error', err));
}

module.exports.getUser = (req, res) => {
  Users.find({})
    .then(users => {
      console.log(1,users);
      res.send(users)
    })
    .catch(err => console.log('error', err));
}

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => console.log('error', err));
}

module.exports.patchUserInfo = (req, res) => {
  const {name, about} = req.body;

  Users.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then(user => res.send(user))
    .catch(err => console.log('error', err));
}

module.exports.patchUserAvatar = (req, res) => {
  const {avatar} = req.body;

  Users.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
    .then(user => res.send(user))
    .catch(err => console.log('error', err));
}