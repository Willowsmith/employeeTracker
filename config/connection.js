const mysql = require('mysql2');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    password: 'computersaysno1',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);