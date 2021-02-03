const mysql = require('mysql')

const { mySQLConfig } = require('../config')

const db = mysql.createPool(mySQLConfig)

exports.getSecureConnection = function (res, token, query, data, callBack) {
    db.getConnection(function (error, tempDb) {
        if (!!error) {
            console.log('DbConnectionError', error)
            return res.status(503).send({ 'msg': 'Unable to reach database!' })
        }
        else {
            tempDb.query(query, data, (error, result) => {
                tempDb.release()
                return uniqueFetchResponse(tempDb, token, error, result, res, callBack)
            })
        }
    })
}

exports.getConnection = function (res, query, data, callBack) {
    db.getConnection(function (error, tempDb) {
        if (!!error) {
            console.log('DbConnectionError', error)
            return res.status(503).send({ 'msg': 'Unable to reach database!' })
        }
        else {
            tempDb.query(query, data, (error, result) => {
                tempDb.release()
                return gerenalFetchResponse(error, result, res, callBack)
            })
        }
    })
}

exports.getTransactionalConnection = function () {
    return db
}

function uniqueFetchResponse (tempDb, token, error, result, res, callBack) {
    if (!!error) {
        console.log('TableError', error)
        return res.status(422).send({ 'msg': error.sqlMessage })
    } else {
        tempDb.query(`SELECT * FROM users WHERE id = '${token}' AND active = 1`, (error, result2) => {
            if (result2.length) return callBack(result)
            else return res.status(401).send({ 'msg': 'Invalid Token!' })
        })
    }
}

function gerenalFetchResponse (error, result, res, callBack) {
    if (!!error) {
        console.log('TableError', error)
        return res.status(422).send({ 'msg': error.sqlMessage })
    } else return callBack(result)
}