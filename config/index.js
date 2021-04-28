exports.mySQLConfig = {
    connectionLimit: 50,
    connectTimeout  : 30 * 1000,
    acquireTimeout  : 30 * 1000,
    timeout         : 30 * 1000,
    host: process.env.AWS_DB_HOST,
    user: process.env.AWS_DB_USER,
    password: process.env.AWS_DB_PASSWORD,
    database: process.env.AWS_DB_NAME
}

exports.awsConfig = {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
}