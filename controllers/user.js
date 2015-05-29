// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  console.log('users/post/6')
  var user = new User({
    username: req.query.username,
    password: req.query.password
  });
  console.log('users/post/11')

  // Set the user properties that came from the POST data
  user.name = req.query.name;
  user.designation = req.query.designation;
  user.gender = req.query.gender;
  user.dob = req.query.dob;
  console.log('users/post/18')

  user.save(function(err) {
    if (err)
      res.send(err);
  console.log('users/post/23')

    res.json({ message: 'New user user added to the app!' });
  });
    console.log('users/post/27')

};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};


// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
  // Use the User model to find a specific user
  User.find({ _id: req.params.user_id }, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// Create endpoint /api/users/:user_id for PUT
exports.putUser = function(req, res) {
  console.log('updating...')
  // Use the User model to find a specific user
  User.update(
    { _id: req.params.user_id }, 
    { name: req.query.name, designation: req.query.designation, gender: req.query.gender, dob: req.query.dob }, 
    function(err, num, raw) {  
    if (err) {   console.log('error in updating...')

      res.send(err);
    }

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/users/:user_id for DELETE
exports.deleteUser = function(req, res) {
  console.log('delete1')
  // Use the User model to find a specific user and remove it
  User.remove({ _id: req.params.user_id }, function(err) {
    if (err)
      res.send(err);
console.log('delete2')
    res.json({ message: 'User removed from the app!' });
    console.log('delete3')
  });
};
