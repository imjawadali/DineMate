const mysql = require('mysql')

const { mySQLConfig } = require('../config')

const db = mysql.createPool(mySQLConfig)

exports.getSecureConnection = function (res, token, query, data, callBack) {
    db.getConnection(function (error, tempDb) {
        if (!!error) {
            console.log('DbConnectionError', error.sqlMessage)
            return res.status(503).send({ 'msg': 'Unable to reach database!' })
        }
        else {
            tempDb.query(`SELECT * FROM users WHERE id = '${token}' AND active = 1`, (error, authResult) => {
                if (authResult && authResult.length) {
                    tempDb.query(query, data, (error, result) => {
                        tempDb.release()
                        return response(error, result, res, callBack)
                    })
                }
                else return res.status(401).send({ 'msg': 'Invalid Session!' })
            })
        }
    })
}

exports.getConnection = function (res, query, data, callBack) {
    db.getConnection(function (error, tempDb) {
        if (!!error) {
            console.log('DbConnectionError', error.sqlMessage)
            return res.status(503).send({ 'msg': 'Unable to reach database!' })
        }
        else {
            tempDb.query(query, data, (error, result) => {
                tempDb.release()
                return response(error, result, res, callBack)
            })
        }
    })
}

exports.getTransactionalConnection = function () {
    return db
}

function response (error, result, res, callBack) {
    if (!!error) {
        console.log('TableError', error.sqlMessage)
        return res.status(422).send({ 'msg': error && error.sqlMessage ? error.sqlMessage.includes('Duplicate') ? 'Duplicate Entry' : error.sqlMessage : 'Unknown error at database' })
    } else return callBack(result)
}