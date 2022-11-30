const { query, request } = require('express');
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
    });
}

const getUser = (req, res) => {
    const id = parseInt(req.params.id);
    
    poll.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    });
}

const addUser = (req, res) => {
    const { cpf, name, email } = req.body;

    poll.query('SELECT name FROM users WHERE cpf = $1', [cpf], (error, results) => {
        if (error) {
            throw error;
        }
        
        if (results.rows[0] != null) {
            return res.status(400).send('CPF already registered!');
        } else {
            poll.query('INSERT INTO users (cpf, name, email) VALUES ($1, $2, $3) RETURNING *', [cpf, name, email], (error, results) => {
                if (error) {
                    throw error;
                }
            });

            poll.query('INSERT INTO account (num) VALUES (1234) RETURNING *', (error, results) => {
                if (error) {
                    throw error;
                }

                res.status(201).send(`User succesfully created!`);
            });
        }
    });
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

    poll.query('SELECT * FROM users where id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows[0] != null) {
            poll.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error;
                }
        
                res.status(200).send(`User with ID: ${id} sucessfully deleted!`);
            });
        } else {
            return res.send('User dont exists!');
        }
    });
}


module.exports = {
    getAllUsers,
    addUser,
    updateUserName,
    deleteUser,
    getUser,
}