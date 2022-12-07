const User = require("../models/user");
const errorHandler = require("../util/error-handler");

exports.update = function (req, res) {
  console.log('checking user...');
  console.log(req.body);
  const email = req.body.email;
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err),
      });
    } else {
      if (!user) {
        console.log('Inserting new user...');
        let newUser = new User(req.body);
        newUser.save(function (err) {
          if (err) {
            return res.status(422).send({
              message: errorHandler.getErrorMessage(err),
            });
          } else {
            res.json(newUser);
          }
        });
      } else {
        console.log('updating user...');
        user.update(req.body);
        res.status(200).json(user);
      }
    }
  });
};

exports.getUser = function (req, res) {
  const id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err),
      });
    } else {
      if (!user) {
        res.status(404).json(null);
      } else {
        res.status(200).json(user);
      }
    }
  });
};

exports.getUserByEmail = function (req, res) {
  const email = req.params.email;
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err),
      });
    } else {
      if (!user) {
        res.status(404).json(null);
      } else {
        res.status(200).json(user);
      }
    }
  });
};

exports.getAllUsers = function (req, res) {
  User.find().exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err),
      });
    } else {
      res.status(200).json(users);
    }
  });
};

exports.updateUserRole = function (req, res) {
  const email = req.params.email;
  
  User.findOne({email: email}, function (err, user) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err),
      });
    } else {
      if (!user) {
        res.status(404).json(null);
      } else {
        User.collection.updateOne({ _id: user._id }, { $set: { roles: req.body } }, function(error, updatedUser) {
          res.status(200).json(user);
        });        
      }
    }
  });
};
