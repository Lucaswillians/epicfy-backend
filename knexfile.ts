module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ?? '3306',
    user: "root",
    password: process.env.DB_PASS,
    database: 'epicfy',
  },
  migrations: {
    directory: "./migrations"
  }
};
