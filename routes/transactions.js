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

const getMoney = (req, res) => {
    const { id } = req.params;

    
}