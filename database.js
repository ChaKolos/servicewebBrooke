const mysql = require('mysql');

const dbConfig = {
  host: 'bivciyzmyrdeul5mf2q3-mysql.services.clever-cloud.com',
  user: 'u2tilkjjvgijmbgy', 
  password: 'f4gtg7z39uUpnede5Yue', 
  database: 'bivciyzmyrdeul5mf2q3' 
};

const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
