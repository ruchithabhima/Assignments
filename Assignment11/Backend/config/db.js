const mysql=require("mysql2/promise");
const pool=mysql.createPool({
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_name,
    port: process.env.db_port,
     waitForConnections: true,
    connectionLimit: 10,
    ssl: {
    rejectUnauthorized: false,
  },
});

module.exports=pool;