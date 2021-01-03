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
        getConnection(
            res,
            `SELECT id, adminName, email, role, restaurantId FROM users WHERE email = BINARY '${email}' AND password = BINARY '${password}'`,
            null,
            (data) => {
                if (data[0])
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
            if (!secondaryContact.role) return res.status(422).send({ 'msg': 'Secondary Contact\'s Role is required!' })
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
                                data.restaurantId = restaurantId
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
                                            data.restaurantId = restaurantId
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
            `SELECT R.restaurantId, R.logoUrl, R.restaurantName, R.cuisine, R.primaryContactId, R.secondaryContactId, 
            RA.address, RA.city, RA.country, RA.latitude, RA.longitude, U.adminName
            FROM restaurants R 
            JOIN restaurantsAddress RA on RA.restaurantId = R.restaurantId
            JOIN users U on U.id = R.primaryContactId
            ORDER BY R.createdAt ASC`,
            null,
            (data) => {
                if (data[0]) {
                    return res.send(data)
                } else {
                    return res.status(422).send({ 'msg': 'No reastaurants available!' })
                }
            }
        )
    })
}

function decrypt(token) {
    const decryptedToken = token
    return decryptedToken
}