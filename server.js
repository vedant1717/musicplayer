// Install packages
// npm install express body-parser mysql jsonwebtoken

// Create server.js file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

// Create connection to MySQL database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'music_db'
});

// Connect to MySQL database
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a secret key for JWT
var secret = 'some-secret-key';

// Create a login route
app.post('/login', function(req, res) {
  // Get the username and password from the request body
  var username = req.body.username;
  var password = req.body.password;

  // Check if the username and password are valid
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results) {
    if (err) throw err;
    // If the user is found, generate a JWT and send it as a response
    if (results.length > 0) {
      var user = results[0];
      var token = jwt.sign({ id: user.id, name: user.name, email: user.email, phone: user.phone }, secret, { expiresIn: '1h' });
      res.json({ success: true, message: 'Login successful', token: token });
    } else {
      // If the user is not found, send an error message
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// Create a signup route
app.post('/signup', function(req, res) {
  // Get the user information from the request body
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var phone = req.body.phone;

  // Check if the email is already taken
  connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, results) {
    if (err) throw err;
    // If the email is already taken, send an error message
    if (results.length > 0) {
      res.json({ success: false, message: 'Email already exists' });
    } else {
      // If the email is not taken, insert the user into the database
      connection.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, password, phone], function(err, results) {
        if (err) throw err;
        // Generate a JWT and send it as a response
        var token = jwt.sign({ id: results.insertId, name: name, email: email, phone: phone }, secret, { expiresIn: '1h' });
        res.json({ success: true, message: 'Signup successful', token: token });
      });
    }
  });
});

// Create a middleware to verify the JWT
function verifyToken(req, res, next) {
  // Get the token from the request header
  var token = req.headers['x-access-token'];
  // Check if the token exists
  if (token) {
    // Verify the token using the secret key
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        // If the token is invalid or expired, send an error message
        res.json({ success: false, message: 'Invalid or expired token' });
      } else {
        // If the token is valid, save the decoded data to the request object and proceed to the next middleware or route handler
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // If the token is not provided, send an error message
    res.json({ success: false, message: 'No token provided' });
  }
}

// Create a route to get the current user information
app.get('/user', verifyToken, function(req, res) {
  // Get the decoded data from the request object
  var user = req.decoded;
  // Send the user information as a response
  res.json({ success: true, user: user });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log('Server running on port 3000');
});

