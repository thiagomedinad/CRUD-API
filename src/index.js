const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db_login = require('../routes/user');

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

// UserLogin Routes
app.get('/users', db_login.getAllUsers);
app.get('/users/:id', db_login.getUser);
app.post('/users', db_login.addUser);
app.put('/users/:id', db_login.updateUserName);
app.delete('/users/:id', db_login.deleteUser);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});