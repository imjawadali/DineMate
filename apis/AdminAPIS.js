const { getSecureConnection, getConnection, getTransactionalConnection } = require('../services/mySql')

module.exports = app => {
    app.get('/secureTest', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        getSecureConnection(
            res,
            adminId,
            `SELECT * FROM users WHERE id = 1`,
            null,
            (data) => {
                return res.send(data[0])
            }
        )
    })

    app.post('/admin/login', async (req, res) => {
        const { email, password } = req.body
        if (!email) return res.status(422).send({ 'msg': 'Email is required!' })
        if (!password) return res.status(422).send({ 'msg': 'Password is required!' })
        let sql = 'SELECT U.id, U.adminName, U.email, U.role, U.restaurantId'
        if (lowerCased(email) !== 'ahads62426@gmail.com')
            sql += ', R.restaurantName'
        sql += ' FROM users U'
        if (lowerCased(email) !== 'ahads62426@gmail.com')
            sql += ' JOIN restaurants R on U.restaurantId = R.restaurantId'
        sql += ` WHERE U.email = '${lowerCased(email)}' AND U.password = BINARY '${password}'`
        getConnection(
            res,
            sql,
            null,
            (data) => {
                if (data.length)
                    return res.send(data[0])
                else
                    return res.status(422).send({ 'msg': 'Invalid credentials provided!' })
            }
        )
    })

    app.post('/admin/addRestuarant', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        const { restaurantId, logoUrl, restaurantName, cuisine, address, primaryContact, secondaryContact  } = req.body
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!restaurantId) return res.status(422).send({ 'msg': 'Slug is required!' })
        if (!restaurantName) return res.status(422).send({ 'msg': 'Restaurant Name is required!' })
        if (!address) return res.status(422).send({ 'msg': 'Address fields are required!' })
        if (!address.address) return res.status(422).send({ 'msg': 'Address is required!' })
        if (!address.city) return res.status(422).send({ 'msg': 'City is required!' })
        if (!address.country) return res.status(422).send({ 'msg': 'Country is required!' })
        if (!primaryContact) return res.status(422).send({ 'msg': 'Primary Contact fields are required!' })
        if (!primaryContact.adminName) return res.status(422).send({ 'msg': 'Primary Contact\'s Name is required!' })
        if (!primaryContact.email) return res.status(422).send({ 'msg': 'Primary Contact\'s Email is required!' })
        if (secondaryContact) {
            if (!secondaryContact.adminName) return res.status(422).send({ 'msg': 'Secondary Contact\'s Name is required!' })
            if (!secondaryContact.email) return res.status(422).send({ 'msg': 'Secondary Contact\'s Email is required!' })
        }

        getTransactionalConnection()
        .getConnection(function (error, tempDb) {
            if (!!error) {
                console.log('DbConnectionError', error)
                return res.status(503).send({ 'msg': 'Unable to reach database!' })
            }
            
            tempDb.query(`SELECT * FROM users WHERE id = '${adminId}' AND role = 'SuperAdmin'`, (error, authResult) => {
                if (!!error) return res.status(422).send({ 'msg': error.sqlMessage })
                if (authResult.length) {
                    tempDb.beginTransaction(function (error) {
                        if (!!error) {
                            console.log('TransactionError', error)
                            return res.status(422).send({ 'msg': error.sqlMessage })
                        }
                        let hashString = Math.random().toString(36).substring(2);
                        const restaurant = {}
                        restaurant.restaurantId = restaurantId
                        restaurant.logoUrl = logoUrl
                        restaurant.restaurantName = restaurantName
                        if (cuisine)
                            restaurant.cuisine = cuisine
                        restaurant.city = address.city
                        restaurant.secondaryContactId = restaurantId
                        
                        let data = address
                        data.restaurantId = restaurantId
                        tempDb.query('INSERT INTO restaurantsAddress SET ?', data, function(error, result) {
                            if (!!error) {
                                console.log('TableError', error)
                                tempDb.rollback(function() {
                                    return res.status(422).send({ 'msg': error.sqlMessage })
                                })
                            } else {
                                restaurant.addressId = result.insertId
                                data = primaryContact
                                data.email = lowerCased(primaryContact.email)
                                data.restaurantId = restaurantId
                                data.hashString = hashString
                                tempDb.query('INSERT INTO users SET ?', data, function(error, result) {
                                    if (!!error) {
                                        console.log('TableError', error)
                                        tempDb.rollback(function() {
                                            return res.status(422).send({ 'msg': error.sqlMessage })
                                        })
                                    } else {
                                        restaurant.primaryContactId = result.insertId
                                        if (secondaryContact) {
                                            data = secondaryContact
                                            data.email = lowerCased(secondaryContact.email)
                                            data.restaurantId = restaurantId
                                            hashString = Math.random().toString(36).substring(2);
                                            data.hashString = hashString
                                            tempDb.query('INSERT INTO users SET ?', data, function(error, result) {
                                                if (!!error) {
                                                    console.log('TableError', error)
                                                    tempDb.rollback(function() {
                                                        return res.status(422).send({ 'msg': error.sqlMessage })
                                                    })
                                                } else {
                                                    restaurant.secondaryContactId = result.insertId
                                                    tempDb.query('INSERT INTO restaurants SET ?', restaurant, function(error) {
                                                        if (!!error) {
                                                            console.log('TableError', error)
                                                            tempDb.rollback(function() {
                                                                return res.status(422).send({ 'msg': error.sqlMessage })
                                                            })
                                                        } else {
                                                            tempDb.commit(function(error) {
                                                                if (error) { 
                                                                    tempDb.rollback(function() {
                                                                        return res.status(422).send({ 'msg': error.sqlMessage })
                                                                    })
                                                                }
                                                                tempDb.release()
                                                                return res.send({
                                                                    'msg': 'Restuarant Added Successfully!'
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                            tempDb.query('INSERT INTO restaurants SET ?', restaurant, function(error) {
                                                if (!!error) {
                                                    console.log('TableError', error)
                                                    tempDb.rollback(function() {
                                                        return res.status(422).send({ 'msg': error.sqlMessage })
                                                    })
                                                } else {
                                                    tempDb.commit(function(error) {
                                                        if (error) { 
                                                            tempDb.rollback(function() {
                                                                return res.status(422).send({ 'msg': error.sqlMessage })
                                                            })
                                                        }
                                                        tempDb.release()
                                                        return res.send({
                                                            'msg': 'Restuarant Added Successfully!'
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
                else return res.status(401).send({ 'msg': 'Invalid Token!' })
            })
        })
    })

    app.post('/admin/forgotPassword', async (req, res) => {
        const { email } = req.body
        if (!email) return res.status(422).send({ 'msg': 'Email is required!' })
        const hashString = Math.random().toString(36).substring(2);
        getConnection(
            res,
            `UPDATE users SET ? WHERE email = '${lowerCased(email)}'`,
            { passwordForgotten: 1, hashString },
            (result) => {
                if (result.changedRows)
                    return res.send({ 'msg': 'Password Reset Link Sent!' })
                else return res.status(422).send({ 'msg': 'Link Expired!' })
            }
        )
    })

    app.post('/admin/createPassword', async (req, res) => {
        const { restaurantId, email, password, hashString } = req.body
        if (!restaurantId) return res.status(422).send({ 'msg': 'Restaurant ID is required!' })
        if (!email) return res.status(422).send({ 'msg': 'Email is required!' })
        if (!password) return res.status(422).send({ 'msg': 'Password is required!' })
        if (!hashString) return res.status(422).send({ 'msg': 'Invalid hashString!' })
        getConnection(
            res,
            `UPDATE users SET ? WHERE email = '${lowerCased(email)}' 
            AND restaurantId = BINARY '${restaurantId}' 
            AND passwordForgotten = 1 
            AND hashString = '${hashString}'`,
            { password, passwordForgotten: 0 },
            (result) => {
                if (result.changedRows)
                    return res.send({ 'msg': 'Password Updated Successfully!' })
                else return res.status(422).send({ 'msg': 'Link Expired!' })
            }
        )
    })

    app.post('/admin/generateQrs', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        const { restaurantId, values } = req.body
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!restaurantId) return res.status(401).send({ 'msg': 'Restaurant Id is required!' })
        if (!values || !values.length) return res.status(401).send({ 'msg': 'QR values required!' })

        getTransactionalConnection()
        .getConnection(function (error, tempDb) {
            if (!!error) {
                console.log('DbConnectionError', error)
                return res.status(503).send({ 'msg': 'Unable to reach database!' })
            } else {
                tempDb.query(`SELECT * FROM users WHERE id = '${adminId}' AND role = 'SuperAdmin'`, (error, authResult) => {
                    if (!!error) return res.status(422).send({ 'msg': error.sqlMessage })
                    if (authResult.length) {
                        tempDb.beginTransaction(function (error) {
                            if (!!error) {
                                console.log('TransactionError', error)
                                return res.status(422).send({ 'msg': error.sqlMessage })
                            }

                            let query = 'INSERT INTO restaurantsQrs ( restaurantId, value ) VALUES'
                            for (var i=0; i<values.length; i++) {
                                query = query + ` ( '${restaurantId}', '${values[i]}' )`
                                if (i !== (values.length - 1))
                                    query = query + ','
                            }
                            console.log(query)
                            tempDb.query(query, function(error) {
                                if (!!error) {
                                    console.log('TableError', error)
                                    tempDb.rollback(function() {
                                        return res.status(422).send({ 'msg': error.sqlMessage })
                                    })
                                } else {
                                    tempDb.commit(function(error) {
                                        if (error) { 
                                            tempDb.rollback(function() {
                                                return res.status(422).send({ 'msg': error.sqlMessage })
                                            })
                                        }
                                        tempDb.release()
                                        return res.send({
                                            'msg': 'QRs Generated Successfully!'
                                        })
                                    })
                                }
                            })
                        })
                    }
                    else return res.status(401).send({ 'msg': 'Invalid Token!' })
                })
            }
        })
    })

    app.get('/admin/getAllRestaurants', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        getSecureConnection(
            res,
            adminId,
            `SELECT R.restaurantId, R.logoUrl, R.restaurantName, U.adminName, 
            R.cuisine, R.primaryContactId, R.secondaryContactId, 
            RA.address, RA.city, RA.country, RA.latitude, RA.longitude,
            (SELECT COUNT(*) FROM restaurantsQrs RQ WHERE RQ.restaurantId = R.restaurantId) as qrCounts
            FROM restaurants R 
            JOIN restaurantsAddress RA on RA.restaurantId = R.restaurantId
            JOIN users U on U.id = R.primaryContactId
            ORDER BY R.createdAt DESC`,
            null,
            (data) => {
                if (data.length) {
                    return res.send(data)
                } else {
                    return res.status(422).send({ 'msg': 'No reastaurants available!' })
                }
            }
        )
    })

    app.post('/admin/getExistingQrs', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        const { restaurantId } = req.body
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!restaurantId) return res.status(401).send({ 'msg': 'Restaurant Id is required!' })
        getSecureConnection(
            res,
            adminId,
            `SELECT id, tableName, value, active FROM restaurantsQrs WHERE restaurantId = '${restaurantId}'`,
            null,
            (data) => {
                if (data.length) {
                    return res.send(data)
                } else {
                    return res.status(422).send({ 'msg': 'No QRs available!' })
                }
            }
        )
    })

    app.post('/admin/setTableName', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        const { id, tableName } = req.body
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!id) return res.status(401).send({ 'msg': 'Table Id is required!' })
        getSecureConnection(
            res,
            adminId,
            `UPDATE restaurantsQrs SET ? WHERE id = ${id}`,
            { tableName },
            (result) => {
                if (result.changedRows)
                    return res.send({ 'msg': 'Table Name Updated Successfully!' })
                else return res.status(422).send({ 'msg': 'Invalid Table ID!' })
            }
        )
    })

    app.get('/admin/getSuperAdminDashboard', async (req, res) => {
        const adminId = decrypt(req.header('authorization'))
        if (!adminId) return res.status(401).send({ 'msg': 'Not Authorized!' })
        getSecureConnection(
            res,
            adminId,
            `SELECT (SELECT COUNT(*) FROM restaurants) as restaurants,
            (SELECT COUNT(*) FROM users WHERE role = 'Admin') as admins,
            (SELECT COUNT(*) FROM restaurantsQrs) as qrs
            FROM users WHERE id = ${adminId} AND role = 'SuperAdmin'`,
            null,
            (data) => {
                if (data.length) {
                    return res.send(data[0])
                } else {
                    return res.status(422).send({ 'msg': 'Dashboard data not available!' })
                }
            }
        )
    })
}

function decrypt(token) {
    const decryptedToken = token
    return decryptedToken
}

function lowerCased(string) {
    return string.toLowerCase()
}