const { getSecureConnection, getConnection, getTransactionalConnection } = require('../services/mySqlCustomer')
const { sendEmail } = require('../services/mailer')
const { uploader, s3 } = require('../services/uploader')

const URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com'

module.exports = app => {
    app.post('/customer/signUp', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/signUp")
            console.log(req.body)
            const { firstName, lastName, email, password, phoneNumber } = req.body
            if (!firstName) return res.send({
                status: false,
                message: 'FirstName is required!',
                errorCode: 422
            })
            if (!lastName) return res.send({
                status: false,
                message: 'LastName is required!',
                errorCode: 422
            })
            if (!email) return res.send({
                status: false,
                message: 'Email is required!',
                errorCode: 422
            })
            if (!password) return res.send({
                status: false,
                message: 'Password is required!',
                errorCode: 422
            })
            getConnection(
                res,
                `INSERT INTO customers SET ?`,
                { firstName, lastName, email, password, phoneNumber },
                (result) => {
                    if (result.affectedRows) return res.send({
                        status: true,
                        message: 'Signed-Up Successfully!',
                    })
                    else return res.send({
                        status: false,
                        message: 'Customer Sign-Up Failed!',
                        errorCode: 422
                    })
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/login', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/login")
            console.log(req.body)
            const { email, password } = req.body
            if (!email) return res.send({
                status: false,
                message: 'Email is required!',
                errorCode: 422
            })
            if (!password) return res.send({
                status: false,
                message: 'Password is required!',
                errorCode: 422
            })
            getConnection(
                res,
                `SELECT id, email FROM customers
                WHERE email = '${lowerCased(email)}' AND password = BINARY '${password}'`,
                null,
                (data) => {
                    if (data.length)
                        return res.send({
                            status: true,
                            message: 'Logged-In Successfully!',
                            body: data[0]
                        })
                    else
                        return res.send({
                            status: false,
                            message: 'Invalid Credentials Provided!',
                            errorCode: 422
                        })
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.get('/customer/getProfile', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/getProfile")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
            getSecureConnection(
                res,
                customerId,
                `SELECT imageUrl, firstName, lastName, email, phoneNumber, address FROM customers WHERE id = ${customerId}`,
                null,
                (data) => {
                    if (data.length)
                        return res.send({
                            status: true,
                            message: 'Logged-In Successfully!',
                            body: data[0]
                        })
                    else
                        return res.send({
                            status: false,
                            message: 'Invalid Credentials Provided!',
                            errorCode: 422
                        })
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/forgotPassword', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/forgotPassword")
            console.log(req.body)
            const { email } = req.body
            if (!email) return res.send({
                status: false,
                message: 'Email is required!',
                errorCode: 422
            })
            const hashString = Math.random().toString(36).substring(2)
            getConnection(
                res,
                `UPDATE customers SET ? WHERE email = '${lowerCased(email)}'`,
                { passwordForgotten: 1, hashString },
                async (result) => {
                    if (result.changedRows) {
                        const emailStatus = await sendEmail(
                            email,
                            'Reset Password Link',
                            forgotPasswordMessage(`${URL}/customer/createPassword/${email}/${hashString}`)
                        )
                        if (emailStatus && emailStatus.accepted.length)
                            return res.send({
                                status: true,
                                message: 'Password Reset Link Sent!'
                            })
                        else return res.send({
                            status: false,
                            message: `Invalid Email: "${email}"!`,
                            errorCode: 422
                        })
                    }
                    else return res.send({
                        status: false,
                        message: 'Email not registered!',
                        errorCode: 422
                    })
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.get('/customer/getAllRestaurants', async (req, res) => {
        console.log("\n\n>>> /customer/getAllRestaurants")
        getConnection(
            res,
            `SELECT R.restaurantId, R.imageUrl, R.restaurantName, R.cuisine, R.rating, R.city, R.address,
            CONCAT('[',
                GROUP_CONCAT(
                    CONCAT(
                        '{"id":',c.id,
                        ',"name":"',c.name,'"}'
                    ) ORDER BY c.createdAt DESC
                ),
            ']') as categories
            FROM restaurants R 
            LEFT JOIN categories c on c.restaurantId = R.restaurantId
            GROUP BY R.restaurantId
            ORDER BY R.createdAt DESC`,
            null,
            (body) => {
                if (body.length) {
                    const data = []
                    for (let i = 0; i < body.length; i++) {
                        const temp = body[i]
                        if (temp.categories)
                            temp.categories = JSON.parse(temp.categories)
                        data.push(temp)
                    }
                    return res.send({
                        status: true,
                        message: '',
                        body: data
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'No reastaurants available!',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/getRestaurantDetails', async (req, res) => {
        console.log("\n\n>>> /customer/getRestaurantDetails")
        console.log(req.body)
        const { restaurantId } = req.body
        if (!restaurantId) return res.send({
            status: false,
            message: 'Restaurant Id is required!',
            errorCode: 422
        })
        getConnection(
            res,
            `SELECT R.restaurantId, R.imageUrl, R.restaurantName, R.cuisine, R.rating, R.city, R.address,
            CONCAT('[',
                GROUP_CONCAT(
                    CONCAT(
                        '{"id":',c.id,
                        ',"name":"',c.name,'"}'
                    ) ORDER BY c.createdAt DESC
                ),
            ']') as categories
            FROM restaurants R 
            LEFT JOIN categories c on c.restaurantId = R.restaurantId
            WHERE R.restaurantId = '${restaurantId}' 
            GROUP BY R.restaurantId
            ORDER BY R.createdAt DESC`,
            null,
            (body) => {
                if (body.length) {
                    const data = body[0]
                    if (data.categories)
                        data.categories = JSON.parse(data.categories)
                    return res.send({
                        status: true,
                        message: '',
                        body: data
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'No reastaurants details available!',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/getMenuItems', async (req, res) => {
        console.log("\n\n>>> /customer/getMenuItems")
        console.log(req.body)
        const { restaurantId } = req.body
        if (!restaurantId) return res.send({
            status: false,
            message: 'Restaurant Id is required!',
            errorCode: 422
        })
        getConnection(
            res,
            `SELECT m.id, m.imageUrl, m.name, m.shortDescription, m.price, m.categoryId,
            ao.id as addOn_id, ao.name as addOn_name, ao.price as addOn_price, ao.mandatory,
            aoo.id as addOnOption_id, aoo.name as addOnOption_name, aoo.price as addOnOption_price,
            c.name as categoryName
            FROM menu m 
            LEFT JOIN addOns ao ON ao.menuId = m.id
            LEFT JOIN addOnOptions aoo ON aoo.addOnID = ao.id
            LEFT JOIN categories c on c.id = m.categoryId
            WHERE m.restaurantId = '${restaurantId}'`,
            { restaurantId },
            (data) => {
                if (data.length) {
                    let menu = []
                    for (let i = 0; i < data.length; i++) {
                        let addOns = []
                        for (let j = 0; j < data.length; j++) {
                            let addOnOptions = []
                            for (let k = 0; k < data.length; k++) {
                                if (data[k].addOnOption_id && !includes(addOnOptions, data[k].addOnOption_id) && data[k].addOn_id === data[j].addOn_id) {
                                    addOnOptions.push({
                                        id: data[k].addOnOption_id,
                                        name: data[k].addOnOption_name,
                                        price: data[k].addOnOption_price
                                    })
                                }
                            }
                            if (data[j].addOn_id && !includes(addOns, data[j].addOn_id) && data[j].id === data[i].id) {
                                addOns.push({
                                    id: data[j].addOn_id,
                                    name: data[j].addOn_name,
                                    price: data[j].addOn_price,
                                    mandatory: data[j].mandatory,
                                    isradio: !!addOnOptions.length,
                                    addOnOptions
                                })
                            }
                        }
                        const result = !includes(menu, data[i].id)
                        if (result) {
                            menu.push({
                                id: data[i].id,
                                imageUrl: data[i].imageUrl,
                                name: data[i].name,
                                shortDescription: data[i].shortDescription,
                                price: data[i].price,
                                categoryId: data[i].categoryId,
                                categoryName: data[i].categoryName,
                                addOns
                            })
                        }
                    }
                    // menu = getGroupedList(menu, 'categoryName')
                    return res.send({
                        status: true,
                        message: 'Get Menu List Success!',
                        body: menu
                    })
                }
                else return res.send({
                    status: false,
                    message: 'No menu items available!',
                    errorCode: 422
                })
            }
        )
    })

    app.post('/customer/initializeOrder', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/initializeOrder")
            console.log(req.body)
            const { restaurantId, tableId, customerId } = req.body
            if (!restaurantId) return res.send({
                status: false,
                message: 'Restuatant Id is required!',
                errorCode: 422
            })
            if (!tableId) return res.send({
                status: false,
                message: 'Table Id is required!',
                errorCode: 422
            })
            getConnection(
                res,
                `SELECT orderNumber FROM orders WHERE restaurantID = '${restaurantId}' ORDER BY createdAt DESC LIMIT 1`,
                null,
                (result) => {
                    getConnection(
                        res,
                        `SELECT mergeId FROM restaurantsQrs WHERE value = '${tableId}' AND restaurantID = '${restaurantId}'`,
                        null,
                        (result2) => {
                            getConnection(
                                res,
                                `INSERT INTO orders ( restaurantId, tableId, customerId, type, orderNumber ) 
                            VALUES ( '${restaurantId}', '${result2.length && result2[0].mergeId ? result2[0].mergeId : tableId}', ${customerId ? `${customerId}` : null}, 
                            'Dine-In', ${Number(result.length ? result[0].orderNumber : 0) + 1})`,
                                null,
                                (result3) => {
                                    if (result3.affectedRows)
                                        return res.send({
                                            status: true,
                                            message: 'Order Initialized Successfully!',
                                            body: {
                                                orderNumber: padding(Number(result.length ? result[0].orderNumber : 0) + 1, 3),
                                                restaurantId,
                                                tableId: result2.length && result2[0].mergeId ? result2[0].mergeId : tableId
                                            }
                                        })
                                    else return res.send({
                                        status: false,
                                        message: 'Failed to initialize order!',
                                        errorCode: 422
                                    })
                                }
                            )
                        }
                    )
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/addSingleItem', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/addSingleItem")
            console.log(req.body)
            const { restaurantId, orderNumber, quantity, name, price, totalPrice, specialInstructions, addOns } = req.body
            if (!restaurantId) return res.send({
                status: false,
                message: 'Restuatant Id is required!',
                errorCode: 422
            })
            if (!orderNumber) return res.send({
                status: false,
                message: 'Order number is required!',
                errorCode: 422
            })
            if (!quantity) return res.send({
                status: false,
                message: 'Quantity is required!',
                errorCode: 422
            })
            if (!name) return res.send({
                status: false,
                message: 'Item name is required!',
                errorCode: 422
            })
            if (!price) return res.send({
                status: false,
                message: 'Item price is required!',
                errorCode: 422
            })
            if (!totalPrice) return res.send({
                status: false,
                message: 'Total price is required!',
                errorCode: 422
            })
            if (addOns && addOns.length) {
                for (var i = 0; i < addOns.length; i++) {
                    if (!addOns[i].addOnId) return res.send({
                        status: false,
                        message: 'AddOns ID is required!',
                        errorCode: 422
                    })
                    if (!addOns[i].addOnName) return res.send({
                        status: false,
                        message: 'AddOns name is required!',
                        errorCode: 422
                    })
                    if (addOns[i].addOnOptionId && !addOns[i].addOnOption) return res.send({
                        status: false,
                        message: 'AddOn option name is required!',
                        errorCode: 422
                    })
                    if (!addOns[i].addOnOptionId && addOns[i].addOnOption) return res.send({
                        status: false,
                        message: 'AddOns option Id is required!',
                        errorCode: 422
                    })
                    if (!addOns[i].price && addOns[i].price !== 0) return res.send({
                        status: false,
                        message: 'AddOns price is required!',
                        errorCode: 422
                    })
                }
            }

            getTransactionalConnection()
                .getConnection(function (error, tempDb) {
                    if (!!error) {
                        console.log('DbConnectionError', error.sqlMessage)
                        return res.send({
                            status: false,
                            message: 'Unable to reach database!',
                            errorCode: 503
                        })
                    }
                    tempDb.beginTransaction(function (error) {
                        if (!!error) {
                            console.log('TransactionError', error.sqlMessage)
                            return res.send({
                                status: false,
                                message: error.sqlMessage,
                                errorCode: 422
                            })
                        }
                        const orderItem = {}
                        orderItem.restaurantId = restaurantId
                        orderItem.orderNumber = orderNumber
                        orderItem.quantity = quantity
                        orderItem.name = name
                        orderItem.price = price
                        orderItem.totalPrice = totalPrice
                        if (specialInstructions)
                            orderItem.specialInstructions = specialInstructions
                        tempDb.query(`UPDATE orders SET ? WHERE orderNumber = '${orderNumber}' AND restaurantId = '${restaurantId}' AND status = 1`, { ready: 0 }, function (error, result) {
                            if (!!error) {
                                console.log('TableError', error.sqlMessage)
                                tempDb.rollback(function () {
                                    return res.send({
                                        status: false,
                                        message: error.sqlMessage,
                                        errorCode: 422
                                    })
                                })
                            } else {
                                tempDb.query('INSERT INTO orderItems SET ?', orderItem, function (error, result) {
                                    if (!!error) {
                                        console.log('TableError', error.sqlMessage)
                                        tempDb.rollback(function () {
                                            return res.send({
                                                status: false,
                                                message: error.sqlMessage,
                                                errorCode: 422
                                            })
                                        })
                                    } else {
                                        if (addOns && addOns.length) {
                                            let query = 'INSERT INTO orderItemAddOns ( orderItemId, addOnId, addOnName, addOnOptionId, addOnOption, price ) VALUES'
                                            for (var i = 0; i < addOns.length; i++) {
                                                query = query + ` ( '${result.insertId}', '${addOns[i].addOnId}', '${addOns[i].addOnName}', '${addOns[i].addOnOptionId}', '${addOns[i].addOnOption}', '${addOns[i].price}' )`
                                                if (i !== (addOns.length - 1))
                                                    query = query + ','
                                            }
                                            tempDb.query(query, function (error) {
                                                if (!!error) {
                                                    console.log('TableError', error.sqlMessage)
                                                    tempDb.rollback(function () {
                                                        return res.send({
                                                            status: false,
                                                            message: 'Failed to add Item Add-ons',
                                                            errorCode: 422
                                                        })
                                                    })
                                                } else tempDb.commit(function (error) {
                                                    if (error) {
                                                        tempDb.rollback(function () {
                                                            return res.send({
                                                                status: false,
                                                                message: error.sqlMessage,
                                                                errorCode: 422
                                                            })
                                                        })
                                                    }
                                                    tempDb.release()
                                                    return res.send({
                                                        status: true,
                                                        message: 'Order item added successfully!'
                                                    })
                                                })
                                            })
                                        }
                                        else tempDb.commit(function (error) {
                                            if (error) {
                                                tempDb.rollback(function () {
                                                    return res.send({
                                                        status: false,
                                                        message: error.sqlMessage,
                                                        errorCode: 422
                                                    })
                                                })
                                            }
                                            tempDb.release()
                                            return res.send({
                                                status: true,
                                                message: 'Order item added successfully!'
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    })
                })
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/submitOrder', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/submitOrder")
            console.log(req.body)
            const { restaurantId, orderNumber, items } = req.body
            if (!restaurantId) return res.send({
                status: false,
                message: 'Restuatant Id is required!',
                errorCode: 422
            })
            if (!orderNumber) return res.send({
                status: false,
                message: 'Order number is required!',
                errorCode: 422
            })
            if (!items || !items.length) return res.send({
                status: false,
                message: 'No items to submit!',
                errorCode: 422
            })
            for (var i = 0; i < items.length; i++) {
                const { quantity, name, price, totalPrice, addOns } = items[i]
                if (!quantity) return res.send({
                    status: false,
                    message: 'Quantity is required!',
                    errorCode: 422
                })
                if (!name) return res.send({
                    status: false,
                    message: 'Item name is required!',
                    errorCode: 422
                })
                if (!price) return res.send({
                    status: false,
                    message: 'Item price is required!',
                    errorCode: 422
                })
                if (!totalPrice) return res.send({
                    status: false,
                    message: 'Total price is required!',
                    errorCode: 422
                })
                if (addOns && addOns.length) {
                    for (var i = 0; i < addOns.length; i++) {
                        if (!addOns[i].addOnId) return res.send({
                            status: false,
                            message: 'AddOns ID is required!',
                            errorCode: 422
                        })
                        if (!addOns[i].addOnName) return res.send({
                            status: false,
                            message: 'AddOns name is required!',
                            errorCode: 422
                        })
                        if (addOns[i].addOnOptionId && !addOns[i].addOnOption) return res.send({
                            status: false,
                            message: 'AddOn option name is required!',
                            errorCode: 422
                        })
                        if (!addOns[i].addOnOptionId && addOns[i].addOnOption) return res.send({
                            status: false,
                            message: 'AddOns option Id is required!',
                            errorCode: 422
                        })
                        if (!addOns[i].price && addOns[i].price !== 0) return res.send({
                            status: false,
                            message: 'AddOns price is required!',
                            errorCode: 422
                        })
                    }
                }
            }

            getTransactionalConnection()
                .getConnection(function (error, tempDb) {
                    if (!!error) {
                        console.log('DbConnectionError', error.sqlMessage)
                        return res.send({
                            status: false,
                            message: 'Unable to reach database!',
                            errorCode: 503
                        })
                    }
                    tempDb.beginTransaction(function (error) {
                        if (!!error) {
                            console.log('TransactionError', error.sqlMessage)
                            return res.send({
                                status: false,
                                message: error.sqlMessage,
                                errorCode: 422
                            })
                        }
                        if (items && items.length) {
                            tempDb.query(`UPDATE orders SET ? WHERE orderNumber = '${orderNumber}' AND restaurantId = '${restaurantId}' AND status = 1`, { ready: 0 }, function (error, result) {
                                if (!!error) {
                                    console.log('TableError', error.sqlMessage)
                                    tempDb.rollback(function () {
                                        return res.send({
                                            status: false,
                                            message: error.sqlMessage,
                                            errorCode: 422
                                        })
                                    })
                                } else {
                                    for (var i = 0; i < items.length; i++) {
                                        const { quantity, name, price, totalPrice, specialInstructions, addOns } = items[i]
                                        const orderItem = {}
                                        orderItem.restaurantId = restaurantId
                                        orderItem.orderNumber = orderNumber
                                        orderItem.quantity = quantity
                                        orderItem.name = name
                                        orderItem.price = price
                                        orderItem.totalPrice = totalPrice
                                        if (specialInstructions)
                                            orderItem.specialInstructions = specialInstructions
                                        tempDb.query('INSERT INTO orderItems SET ?', orderItem, function (error, result) {
                                            if (!!error) {
                                                console.log('TableError', error.sqlMessage)
                                                tempDb.rollback(function () {
                                                    return res.send({
                                                        status: false,
                                                        message: error.sqlMessage,
                                                        errorCode: 422
                                                    })
                                                })
                                            } else {
                                                if (addOns && addOns.length) {
                                                    let query = 'INSERT INTO orderItemAddOns ( orderItemId, addOnId, addOnName, addOnOptionId, addOnOption, price ) VALUES'
                                                    for (var i = 0; i < addOns.length; i++) {
                                                        query = query + ` ( '${result.insertId}', '${addOns[i].addOnId}', '${addOns[i].addOnName}', '${addOns[i].addOnOptionId}', '${addOns[i].addOnOption}', '${addOns[i].price}' )`
                                                        if (i !== (addOns.length - 1))
                                                            query = query + ','
                                                    }
                                                    tempDb.query(query, function (error) {
                                                        if (!!error) {
                                                            console.log('TableError', error.sqlMessage)
                                                            tempDb.rollback(function () {
                                                                return res.send({
                                                                    status: false,
                                                                    message: 'Failed to add Item Add-ons',
                                                                    errorCode: 422
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                    tempDb.commit(function (error) {
                                        if (error) {
                                            tempDb.rollback(function () {
                                                return res.send({
                                                    status: false,
                                                    message: error.sqlMessage,
                                                    errorCode: 422
                                                })
                                            })
                                        }
                                        tempDb.release()
                                        return res.send({
                                            status: true,
                                            message: 'Order item(s) added successfully!'
                                        })
                                    })
                                }
                            })
                        }
                    })
                })
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/takeAwayOrder', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/takeAwayOrder")
            console.log(req.body)
            const { restaurantId, customerId, items } = req.body
            if (!restaurantId) return res.send({
                status: false,
                message: 'Restuatant Id is required!',
                errorCode: 422
            })
            if (!items || !items.length) return res.send({
                status: false,
                message: 'No items to submit!',
                errorCode: 422
            })
            for (var i = 0; i < items.length; i++) {
                const { quantity, name, price, totalPrice, addOns } = items[i]
                if (!quantity) return res.send({
                    status: false,
                    message: 'Quantity is required!',
                    errorCode: 422
                })
                if (!name) return res.send({
                    status: false,
                    message: 'Item name is required!',
                    errorCode: 422
                })
                if (!price) return res.send({
                    status: false,
                    message: 'Item price is required!',
                    errorCode: 422
                })
                if (!totalPrice) return res.send({
                    status: false,
                    message: 'Total price is required!',
                    errorCode: 422
                })
                if (addOns && addOns.length) {
                    for (var i = 0; i < addOns.length; i++) {
                        if (!addOns[i].addOnId) return res.send({
                            status: false,
                            message: 'AddOns ID is required!',
                            errorCode: 422
                        })
                        if (!addOns[i].addOnName) return res.send({
                            status: false,
                            message: 'AddOns name is required!',
                            errorCode: 422
                        })
                        if (addOns[i].addOnOptionId && !addOns[i].addOnOption) return res.send({
                            status: false,
                            message: 'AddOn option name is required!',
                            errorCode: 422
                        })
                        if (!addOns[i].addOnOptionId && addOns[i].addOnOption) return res.send({
                            status: false,
                            message: 'AddOns option Id is required!',
                            errorCode: 422
                        })
                        if (!addOns[i].price && addOns[i].price !== 0) return res.send({
                            status: false,
                            message: 'AddOns price is required!',
                            errorCode: 422
                        })
                    }
                }
            }
            getConnection(
                res,
                `SELECT orderNumber FROM orders WHERE restaurantID = '${restaurantId}' ORDER BY createdAt DESC LIMIT 1`,
                null,
                (result) => {
                    const orderNumber = padding(Number(result.length ? result[0].orderNumber : 0) + 1, 3)
                    getTransactionalConnection()
                        .getConnection(function (error, tempDb) {
                            if (!!error) {
                                console.log('DbConnectionError', error.sqlMessage)
                                return res.send({
                                    status: false,
                                    message: 'Unable to reach database!',
                                    errorCode: 503
                                })
                            }
                            tempDb.beginTransaction(function (error) {
                                if (!!error) {
                                    console.log('TransactionError', error.sqlMessage)
                                    return res.send({
                                        status: false,
                                        message: error.sqlMessage,
                                        errorCode: 422
                                    })
                                }
                                tempDb.query(`INSERT INTO orders ( restaurantId, customerId, type, orderNumber, status ) 
                                VALUES ( '${restaurantId}', ${customerId ? `${customerId}` : null}, 'Take-Away', ${orderNumber}, 0)`,
                                    function (error, result2) {
                                        if (!!error) {
                                            console.log('TableError', error.sqlMessage)
                                            tempDb.rollback(function () {
                                                return res.send({
                                                    status: false,
                                                    message: error.sqlMessage,
                                                    errorCode: 422
                                                })
                                            })
                                        }
                                        else if (result2.affectedRows) {
                                            for (var i = 0; i < items.length; i++) {
                                                const { quantity, name, price, totalPrice, specialInstructions, addOns } = items[i]
                                                const orderItem = {}
                                                orderItem.restaurantId = restaurantId
                                                orderItem.orderNumber = orderNumber
                                                orderItem.quantity = quantity
                                                orderItem.name = name
                                                orderItem.price = price
                                                orderItem.totalPrice = totalPrice
                                                if (specialInstructions)
                                                    orderItem.specialInstructions = specialInstructions
                                                tempDb.query('INSERT INTO orderItems SET ?', orderItem, function (error, result3) {
                                                    if (!!error) {
                                                        console.log('TableError', error.sqlMessage)
                                                        tempDb.rollback(function () {
                                                            return res.send({
                                                                status: false,
                                                                message: error.sqlMessage,
                                                                errorCode: 422
                                                            })
                                                        })
                                                    } else {
                                                        if (addOns && addOns.length) {
                                                            let query = 'INSERT INTO orderItemAddOns ( orderItemId, addOnId, addOnName, addOnOptionId, addOnOption, price ) VALUES'
                                                            for (var i = 0; i < addOns.length; i++) {
                                                                query = query + ` ( '${result3.insertId}', '${addOns[i].addOnId}', '${addOns[i].addOnName}', '${addOns[i].addOnOptionId}', '${addOns[i].addOnOption}', '${addOns[i].price}' )`
                                                                if (i !== (addOns.length - 1))
                                                                    query = query + ','
                                                            }
                                                            tempDb.query(query, function (error) {
                                                                if (!!error) {
                                                                    console.log('TableError', error.sqlMessage)
                                                                    tempDb.rollback(function () {
                                                                        return res.send({
                                                                            status: false,
                                                                            message: 'Failed to add Item Add-ons',
                                                                            errorCode: 422
                                                                        })
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                            tempDb.commit(function (error) {
                                                if (error) {
                                                    tempDb.rollback(function () {
                                                        return res.send({
                                                            status: false,
                                                            message: error.sqlMessage,
                                                            errorCode: 422
                                                        })
                                                    })
                                                }
                                                tempDb.release()
                                                return res.send({
                                                    status: true,
                                                    message: 'Order item(s) added successfully!',
                                                    body: {
                                                        orderNumber,
                                                        restaurantId,
                                                        tableId: null
                                                    }
                                                })
                                            })
                                        }
                                        else return res.send({
                                            status: false,
                                            message: 'Failed to initialize order!',
                                            errorCode: 422
                                        })
                                    }
                                )
                            })
                        }
                    )
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/getOrderItems', async (req, res) => {
        console.log("\n\n>>> /customer/getOrderItems")
        console.log(req.body)
        const { restaurantId, orderNumber } = req.body
        if (!restaurantId) return res.send({
            status: false,
            message: 'Restuatant Id is required!',
            errorCode: 422
        })
        if (!orderNumber) return res.send({
            status: false,
            message: 'Order number is required!',
            errorCode: 422
        })
        getConnection(
            res,
            `SELECT id, quantity, name, totalPrice FROM orderItems
            WHERE restaurantId = '${restaurantId}' AND orderNumber = '${orderNumber}'`,
            null,
            (body) => {
                if (body.length) {
                    return res.send({
                        status: true,
                        message: '',
                        body
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'No reastaurants available!',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/getOrderItemDetails', async (req, res) => {
        console.log("\n\n>>> /customer/getOrderItemDetails")
        console.log(req.body)
        const { id } = req.body
        if (!id) return res.send({
            status: false,
            message: 'OrderItem Id is required!',
            errorCode: 422
        })
        getConnection(
            res,
            `SELECT OI.name, OI.quantity, OI.status, OI.price, OI.totalPrice, OI.specialInstructions
            FROM orderItems OI
            WHERE id = ${id}`,
            null,
            (body) => {
                if (body.length) {
                    return res.send({
                        status: true,
                        message: '',
                        body
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'No reastaurants available!',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/closeOrderViaCash', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/closeOrderViaCash")
            console.log(req.body)
            const { restaurantId, orderNumber, type } = req.body
            if (!restaurantId) return res.send({
                status: false,
                message: 'Restuatant Id is required!',
                errorCode: 422
            })
            if (!orderNumber) return res.send({
                status: false,
                message: 'Order number is required!',
                errorCode: 422
            })
            if (!type) return res.send({
                status: false,
                message: 'Type is required!',
                errorCode: 422
            })
            let data
            if (type.toLowerCase() === 'take-away')
                data = { status: true, customerStatus: true }
            else data = { customerStatus: true }
            getConnection(
                res,
                `UPDATE orders SET ? WHERE restaurantId = '${restaurantId}' && orderNumber = '${orderNumber}'`,
                data,
                (result) => {
                    if (result.changedRows) {
                        return res.send({
                            status: true,
                            message: type.toLowerCase() === 'take-away' ?
                                'Order Initialized Successfully'
                                : 'Order close request submitted'
                        })
                    } else {
                        return res.send({
                            status: false,
                            message: 'Request already in que!',
                            errorCode: 422
                        })
                    }
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })

    app.post('/customer/getOrderStatus', async (req, res) => {
        console.log("\n\n>>> /customer/getOrderStatus")
        console.log(req.body)
        const { restaurantId, orderNumber } = req.body
        if (!restaurantId) return res.send({
            status: false,
            message: 'Restuatant Id is required!',
            errorCode: 422
        })
        if (!orderNumber) return res.send({
            status: false,
            message: 'Order number is required!',
            errorCode: 422
        })
        getConnection(
            res,
            `SELECT status, customerStatus FROM orders WHERE restaurantId = '${restaurantId}' && orderNumber = '${orderNumber}'`,
            null,
            (result) => {
                if (result.length) {
                    return res.send({
                        status: true,
                        message: result[0].status ?
                            result[0].customerStatus ?
                                'Order closing was requested'
                                : 'Order is active'
                            : 'Order has been closed',
                        body: {
                            active: !!result[0].status,
                            closeRequested: !!result[0].customerStatus
                        }
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'Failed to get order status',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/doNotDisturb', async (req, res) => {
        console.log("\n\n>>> /customer/doNotDisturb")
        console.log(req.body)
        const { restaurantId, orderNumber, enabled } = req.body
        if (!restaurantId) return res.send({
            status: false,
            message: 'Restuatant Id is required!',
            errorCode: 422
        })
        if (!orderNumber) return res.send({
            status: false,
            message: 'Order number is required!',
            errorCode: 422
        })
        if (enabled === undefined || enabled === null || typeof enabled !== 'boolean') return res.send({
            status: false,
            message: 'Boolean value is required!',
            errorCode: 422
        })
        getConnection(
            res,
            `UPDATE orders SET ? WHERE restaurantId = '${restaurantId}' && orderNumber = '${orderNumber}'`,
            { doNotDisturb: enabled },
            (result) => {
                if (result.changedRows) {
                    return res.send({
                        status: true,
                        message: 'Do not disturb status changed!'
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'Failed to update do not disturb status',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/requestService', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/requestService")
            console.log(req.body)
            const { restaurantId, tableId, orderNumber, type, text } = req.body
            if (!restaurantId) return res.send({
                status: false,
                message: 'Restuatant Id is required!',
                errorCode: 422
            })
            if (!tableId) return res.send({
                status: false,
                message: 'Table Id is required!',
                errorCode: 422
            })
            if (!orderNumber) return res.send({
                status: false,
                message: 'Order number is required!',
                errorCode: 422
            })
            if (!type && type !== 0) return res.send({
                status: false,
                message: 'Service type is required!',
                errorCode: 422
            })
            const data = { restaurantId, tableNumber: tableId, orderNumber, type }
            if (text && type !== 0)
                data.text = text
            getConnection(
                res,
                `INSERT INTO servicesQue SET ?`,
                data,
                (result) => {
                    if (result.affectedRows) {
                        return res.send({
                            status: true,
                            message: 'Service request added!'
                        })
                    } else {
                        return res.send({
                            status: false,
                            message: 'Failed to add service request',
                            errorCode: 422
                        })
                    }
                }
            )
        } catch (error) {
            console.log(error)
            return res.send({
                status: false,
                message: 'Service not Available!',
                errorCode: 422
            })
        }
    })
}

function decrypt(token) {
    const decryptedToken = token
    return decryptedToken
}

function lowerCased(string) {
    return string.toLowerCase()
}

function includes(list, id) {
    var result = list.filter(item => item.id === id)
    return result.length
}

function getGroupedList(list, key) {
    let groupedList = []
    if (list && list.length) {
        groupedList = list.reduce((r, a) => {
            r[a[key]] = r[a[key]] || [];
            r[a[key]].push(a);
            return r;
        }, Object.create(null));
    }
    return groupedList
}

function padding(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function forgotPasswordMessage(link) {
    return `Welcome Back!\n\nVisit the following link to reset your login password:\n${link}`
}