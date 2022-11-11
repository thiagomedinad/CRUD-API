const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../queries');

PORT = 8080;
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({message: 'API is working!'})
});

// Routes
app.get('/users', db.getAllUsers);
app.post('/users', db.addUser);
app.put('/users/:id', db.updateUserName);
app.delete('/users/:id', db.deleteUser);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});