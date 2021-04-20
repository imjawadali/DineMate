exports.mySQLConfig = {
    connectionLimit: 50,
    connectTimeout  : 30 * 1000,
    acquireTimeout  : 30 * 1000,
    timeout         : 30 * 1000,
    host: 'dinematedev.csrzbhrmzsxf.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'DineMateDB',
    database: 'DineMateDev'
}

exports.awsConfig = {}