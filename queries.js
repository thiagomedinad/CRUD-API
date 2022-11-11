const { Pool } = require('pg');

const Poll = require('pg').Pool;
const poll = new Poll({
    user: 'thiagomedinad',
    host: 'localhost',
    database: 'api_banco',
    password: 'Recife06',
    port: 5432,
});

const getAllUsers = (req, res) => {
    poll.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const addUser = (req, res) => {
    const { name, email } = req.body;

    poll.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(201).send(`User created with ID: ${results.rows[0].id}`);
    })
}

const updateUserName = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    poll.query('UPDATE users SET name = $1 WHERE id = $2', 
    [name, id], 
    (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).send(`User sucessfully modified with ID: ${id}`);
    });
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    
    poll.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).send(`User with ID: ${id} sucessfully deleted!`);
    })
}

module.exports = {
    getAllUsers,
    addUser,
    updateUserName,
    deleteUser,
}