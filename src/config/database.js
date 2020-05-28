module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'docker',
    database: 'sequelizeDB',
    define: {
        timestamps: true,
        underscored: true,
    }
};