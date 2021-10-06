const uuid = require('uuid').v4
const { getSecureConnection, getConnection, getTransactionalConnection } = require('../services/mySqlCustomer')
const { sendEmail } = require('../services/mailer')
const { postCharge } = require('../services/stripe')
const { uploader, s3 } = require('../services/uploader')
const { sendNotification } = require('../services/firebase')

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
                        body: {
                            id: result.insertId,
                            imageUrl: null,
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                            address: null
                        }
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
            const { email, password, fcmToken } = req.body
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
            if (!fcmToken) return res.send({
                status: false,
                message: 'Invalid FCM Token!',
                errorCode: 422
            })
            getConnection(
                res,
                `SELECT id, imageUrl, firstName, lastName, email, phoneNumber, address FROM customers
                WHERE email = '${lowerCased(email)}' AND password = BINARY '${password}'`,
                null,
                (data) => {
                    if (data.length)
                    return res.send({
                        status: true,
                        message: 'Logged-In Successfuly!',
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

    app.post('/customer/setFcmToken', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/setFcmToken")
            console.log(req.body)
            const { fcmToken } = req.body
            const customerId = decrypt(req.header('authorization'))
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
            if (!fcmToken) return res.send({
                status: false,
                message: 'Invalid FCM Token!',
                errorCode: 422
            })
            getSecureConnection(
                res,
                customerId,
                `UPDATE customers SET ? WHERE id = ${customerId}`,
                { fcmToken },
                (result) => {
                    return res.send({
                        status: true,
                        message: result.changedRows ? `FCM token set` : `FCM token already set`
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
                            message: 'Profile data fetched successfully!',
                            body: data[0]
                        })
                    else
                        return res.send({
                            status: false,
                            message: 'Failed to get profile!',
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

    app.get('/customer/getMyOrders', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/getMyOrders")
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
                `SELECT o.restaurantId, r.restaurantName,
                CONVERT(o.orderNumber, CHAR) as orderNumber,
                SUM(oi.totalPrice) as billAmount,
                o.discount, o.discountType, o.tip, r.taxPercentage,
                o.status as active, o.type
                FROM orders o
                JOIN restaurants r ON r.restaurantId = o.restaurantId
                LEFT JOIN orderItems oi ON oi.restaurantId = o.restaurantId AND oi.orderNumber = o.orderNumber
                WHERE customerId = ${customerId}
                GROUP BY o.restaurantId, o.orderNumber
                ORDER BY o.createdAt DESC`,
                null,
                (body) => {
                    if (body.length) {
                        for (let index = 0; index < body.length; index++) {
                            const { discount, discountType, tip, taxPercentage, billAmount } = body[index]
                            let discountAmount = discount
                            if (discountType === '%')
                                discountAmount = (billAmount * discount) / 100
                            const subtotal = discountAmount < billAmount ? billAmount - discountAmount : 0
                            const taxAmount = (subtotal * taxPercentage) / 100
                            body[index].billAmount = Number((subtotal + taxAmount + tip).toFixed(2))
                        }
                        return res.send({
                            status: true,
                            message: 'Orders list fetched successfully!',
                            body
                        })
                    }
                    else
                        return res.send({
                            status: false,
                            message: 'No past or active orders!',
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

    app.post('/customer/updateProfile', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/updateProfile")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            const { updatedData } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
            if (!updatedData) return res.send({
                status: false,
                message: 'No data provided to update!',
                errorCode: 422
            })

            if (updatedData.imageUrl
                || updatedData.firstName
                || updatedData.lastName
                || updatedData.password
                || updatedData.email
                || updatedData.phoneNumber
                || updatedData.address) {
                getSecureConnection(
                    res,
                    customerId,
                    `UPDATE customers SET ? WHERE id = ${customerId}`,
                    updatedData,
                    (result) => {
                        getConnection(
                            res,
                            `SELECT id, imageUrl, firstName, lastName, email, phoneNumber, address FROM customers WHERE id = ${customerId}`,
                            null,
                            (data) => {
                                if (data.length)
                                    return res.send({
                                        status: true,
                                        message: 'Profile updated successfully!',
                                        body: data[0]
                                    })
                                else
                                    return res.send({
                                        status: false,
                                        message: 'Profile updated, failed to get updated profile!',
                                        errorCode: 422
                                    })
                            }
                        )
                    }
                )
            } else return res.send({
                status: false,
                message: 'Invalid data provided to update!',
                errorCode: 422
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
                            forgotPasswordMessage(`${URL}/customer/setNewPassword/${email}/${hashString}`)
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

    app.post('/customer/setNewPassword', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/setNewPassword")
            console.log(req.body)
            const { email, password, hashString } = req.body
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
            if (!hashString) return res.send({
                status: false,
                message: 'Invalid hashString!',
                errorCode: 422
            })
            let sql = `UPDATE customers SET ? WHERE email = '${lowerCased(email)}' `
            sql += `AND passwordForgotten = 1 `
            sql += `AND hashString = '${hashString}'`
            getConnection(
                res,
                sql,
                { password, passwordForgotten: 0 },
                (result) => {
                    if (result.changedRows)
                        return res.send({
                            status: true,
                            message: 'Password updated successfully!'
                        })
                    else return res.send({
                        status: false,
                        message: 'Link Expired!',
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

    app.get('/customer/getGenericData', async (req, res) => {
        console.log("\n\n>>> /customer/getGenericData")
        getConnection(
            res,
            `SELECT * FROM genericData`,
            null,
            (data) => {
                if (data.length) {
                    let genericData = {}
                    let faqs = []
                    const nonFaqsList = data.filter(x => x.isFaq === 0)
                    const faqsList = data.filter(x => x.isFaq === 1)
                    for (let i = 0; i < nonFaqsList.length; i++) {
                        genericData[nonFaqsList[i].name] = nonFaqsList[i].value
                    }
                    for (let i = 0; i < faqsList.length; i++) {
                        faqs.push({
                            question: faqsList[i].name,
                            answer: faqsList[i].value
                        })
                    }
                    genericData.faqs = faqs
                    return res.send({
                        status: true,
                        message: '',
                        body: genericData
                    })
                } else {
                    return res.send({
                        status: false,
                        message: 'No data available!',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/registerRestuarant', async (req, res) => {
        console.log("\n\n>>> /customer/registerRestuarant")
        console.log(req.body)
        const { restaurantName, address, city, country, firstName, lastName, email, phoneNumber, businessType } = req.body
        if (!restaurantName) return res.send({
            status: false,
            message: 'Restaurant Name is required!',
            errorCode: 422
        })
        if (!address) return res.send({
            status: false,
            message: 'Business Address is required!',
            errorCode: 422
        })
        if (!city) return res.send({
            status: false,
            message: 'City  is required!',
            errorCode: 422
        })
        if (!country) return res.send({
            status: false,
            message: 'Country  is required!',
            errorCode: 422
        })
        if (!firstName) return res.send({
            status: false,
            message: 'First Name is required!',
            errorCode: 422
        })
        let name = firstName
        if (lastName)
            name = firstName + ' ' + lastName
        if (!email) return res.send({
            status: false,
            message: 'Email is required!',
            errorCode: 422
        })
        if (!phoneNumber) return res.send({
            status: false,
            message: 'Phone Number is required!',
            errorCode: 422
        })
        if (!businessType) return res.send({
            status: false,
            message: 'Business Type is required!',
            errorCode: 422
        })

        const emailStatus = await sendEmail(
            'console.dinemate@gmail.com',
            'Register Restaurant',
            registerRestaurantMessage({
                restaurantName, address, city, country, name, email, phoneNumber, businessType
            })
        )
        if (emailStatus && emailStatus.accepted.length)
            return res.send({
                status: true,
                message: 'Registration request submitted!'
            })
        else return res.send({
            status: false,
            message: `Invalid Email: "${email}"!`,
            errorCode: 422
        })
    })

    app.get('/customer/getAllRestaurants', async (req, res) => {
        console.log("\n\n>>> /customer/getAllRestaurants")
        getConnection(
            res,
            `SELECT R.restaurantId, R.imageUrl, R.restaurantName, R.cuisine, R.rating, R.city, R.address,
            CONCAT('[',
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        '{"id":',c.id,
                        ',"name":"',c.name,'"}'
                    ) ORDER BY c.createdAt DESC
                ),
            ']') as categories
            FROM restaurants R 
            JOIN categories c on c.restaurantId = R.restaurantId
            JOIN menu m on m.restaurantId = R.restaurantId
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

    app.post('/customer/searchRestaurants', async (req, res) => {
        console.log("\n\n>>> /customer/searchRestaurants")
        const { searchBy } = req.body
        let query = `SELECT R.restaurantId, R.imageUrl, R.restaurantName, R.cuisine, R.rating, R.city, R.address,
        CONCAT('[',
            GROUP_CONCAT(
                DISTINCT CONCAT(
                    '{"id":',c.id,
                    ',"name":"',c.name,'"}'
                ) ORDER BY c.createdAt DESC
            ),
        ']') as categories
        FROM restaurants R 
        JOIN categories c on c.restaurantId = R.restaurantId
        JOIN menu m on m.restaurantId = R.restaurantId
        WHERE R.restaurantName LIKE '%${searchBy}%'
        OR R.cuisine LIKE '%${searchBy}%'
        OR c.name LIKE '%${searchBy}%'
        OR m.name LIKE '%${searchBy}%'
        GROUP BY R.restaurantId
        ORDER BY R.createdAt DESC`
        if (!searchBy)
            query = `SELECT R.restaurantId, R.imageUrl, R.restaurantName, R.cuisine, R.rating, R.city, R.address,
            CONCAT('[',
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        '{"id":',c.id,
                        ',"name":"',c.name,'"}'
                    ) ORDER BY c.createdAt DESC
                ),
            ']') as categories
            FROM restaurants R 
            JOIN categories c on c.restaurantId = R.restaurantId
            JOIN menu m on m.restaurantId = R.restaurantId
            GROUP BY R.restaurantId
            ORDER BY R.createdAt DESC`
        getConnection(
            res,
            query,
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
                        message: 'No match found!',
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
                    DISTINCT CONCAT(
                        '{"id":',c.id,
                        ',"name":"',c.name,'"}'
                    ) ORDER BY c.createdAt DESC
                ),
            ']') as categories
            FROM restaurants R
            LEFT JOIN categories c on c.restaurantId = R.restaurantId
            JOIN menu m on m.categoryId = c.id AND m.restaurantId = '${restaurantId}'
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
            const customerId = decrypt(req.header('authorization'))
            const { restaurantId, tableId } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
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
            getSecureConnection(
                res,
                customerId,
                `SELECT orderNumber FROM orders WHERE restaurantID = '${restaurantId}' ORDER BY createdAt DESC LIMIT 1`,
                null,
                (result) => {
                    getConnection(
                        res,
                        `SELECT restaurantName FROM restaurants WHERE restaurantID = '${restaurantId}'`,
                        null,
                        (restuarantData) => {
                            const restaurantName = restuarantData[0].restaurantName
                            getConnection(
                                res,
                                `SELECT mergeId FROM restaurantsQrs WHERE value = '${tableId}' AND restaurantID = '${restaurantId}'`,
                                null,
                                (result2) => {
                                    getConnection(
                                        res,
                                        `INSERT INTO orders ( restaurantId, tableId, customerId, type, orderNumber ) 
                                        VALUES ( '${restaurantId}', '${result2.length && result2[0].mergeId ? result2[0].mergeId : tableId}', ${customerId}, 
                                        'Dine-In', ${Number(result.length ? result[0].orderNumber : 0) + 1})`,
                                        null,
                                        (result3) => {
                                            if (result3.affectedRows) {
                                                getConnection(
                                                    res,
                                                    `SELECT fcmToken FROM users WHERE restaurantId = '${restaurantId}' AND (role = 'Admin' || role = 'Staff') AND active = 1`,
                                                    null,
                                                    (result) => {
                                                        if (result.length) {
                                                            var registration_ids = result.map(each => each['fcmToken'])
                                                            sendNotification({
                                                                registration_ids,
                                                                data: {
                                                                    title: 'DineMate',
                                                                    body: JSON.stringify({
                                                                        roles: ['Admin', 'Staff'],
                                                                        type: 'DASHBOARD',
                                                                        restaurantId
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                )
                                                return res.send({
                                                    status: true,
                                                    message: 'Order Initialized Successfully!',
                                                    body: {
                                                        orderNumber: padding(Number(result.length ? result[0].orderNumber : 0) + 1, 3),
                                                        restaurantId,
                                                        restaurantName,
                                                        tableId: result2.length && result2[0].mergeId ? result2[0].mergeId : tableId,
                                                        type: 'Dine-In'
                                                    }
                                                })
                                            } else return res.send({
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

    app.post('/customer/submitOrder', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/submitOrder")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            const { restaurantId, orderNumber, items } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
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
                const { itemId, quantity, name, price, totalPrice, addOns } = items[i]
                if (!itemId) return res.send({
                    status: false,
                    message: 'Item Id is required!',
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
                if (!price && price !== 0) return res.send({
                    status: false,
                    message: 'Item price is required!',
                    errorCode: 422
                })
                if (!totalPrice && totalPrice !== 0) return res.send({
                    status: false,
                    message: 'Total price is required!',
                    errorCode: 422
                })
                if (addOns && addOns.length) {
                    for (var j = 0; j < addOns.length; j++) {
                        if (!addOns[j].addOnId) return res.send({
                            status: false,
                            message: 'AddOns ID is required!',
                            errorCode: 422
                        })
                        if (!addOns[j].addOnName) return res.send({
                            status: false,
                            message: 'AddOns name is required!',
                            errorCode: 422
                        })
                        if (addOns[j].addOnOptionId && !addOns[j].addOnOption) return res.send({
                            status: false,
                            message: 'AddOn option name is required!',
                            errorCode: 422
                        })
                        if (!addOns[j].addOnOptionId && addOns[j].addOnOption) return res.send({
                            status: false,
                            message: 'AddOns option Id is required!',
                            errorCode: 422
                        })
                        if (!addOns[j].price && addOns[j].price !== 0) return res.send({
                            status: false,
                            message: 'AddOns price is required!',
                            errorCode: 422
                        })
                    }
                }
            }
            getConnection(
                res,
                `SELECT * FROM customers WHERE id = '${customerId}' AND active = 1`,
                null,
                (authresult) => {
                    if (authresult.length)
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
                                                    const { itemId, quantity, name, price, totalPrice, specialInstructions, addOns } = items[i]
                                                    const orderItem = {}
                                                    orderItem.restaurantId = restaurantId
                                                    orderItem.orderNumber = orderNumber
                                                    orderItem.itemId = itemId
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
                                                                for (var j = 0; j < addOns.length; j++) {
                                                                    query = query + ` ( '${result.insertId}', '${addOns[j].addOnId}', '${addOns[j].addOnName}', '${addOns[j].addOnOptionId}', '${addOns[j].addOnOption}', '${addOns[j].price}' )`
                                                                    if (j !== (addOns.length - 1))
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
                                                    getConnection(
                                                        res,
                                                        `SELECT fcmToken FROM users WHERE restaurantId = '${restaurantId}' AND (role = 'Admin' || role = 'Staff' || role = 'Kitchen') AND active = 1`,
                                                        null,
                                                        (result) => {
                                                            if (result.length) {
                                                                var registration_ids = result.map(each => each['fcmToken'])
                                                                sendNotification({
                                                                    registration_ids,
                                                                    data: {
                                                                        title: 'DineMate',
                                                                        body: JSON.stringify({
                                                                            roles: ['Admin', 'Staff', 'Kitchen'],
                                                                            type: 'DASHBOARD',
                                                                            restaurantId,
                                                                            orderNumber
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    )
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
                    else return res.send({
                        status: false,
                        message: 'Invalid Session!',
                        errorCode: 401
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

    app.post('/customer/takeAwayOrder', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/takeAwayOrder")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            const { restaurantId, items } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
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
                const { itemId, quantity, name, price, totalPrice, addOns } = items[i]
                if (!itemId) return res.send({
                    status: false,
                    message: 'Item Id is required!',
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
                if (!price && price !== 0) return res.send({
                    status: false,
                    message: 'Item price is required!',
                    errorCode: 422
                })
                if (!totalPrice && totalPrice !== 0) return res.send({
                    status: false,
                    message: 'Total price is required!',
                    errorCode: 422
                })
                if (addOns && addOns.length) {
                    for (var j = 0; j < addOns.length; j++) {
                        if (!addOns[j].addOnId) return res.send({
                            status: false,
                            message: 'AddOns ID is required!',
                            errorCode: 422
                        })
                        if (!addOns[j].addOnName) return res.send({
                            status: false,
                            message: 'AddOns name is required!',
                            errorCode: 422
                        })
                        if (addOns[j].addOnOptionId && !addOns[j].addOnOption) return res.send({
                            status: false,
                            message: 'AddOn option name is required!',
                            errorCode: 422
                        })
                        if (!addOns[j].addOnOptionId && addOns[j].addOnOption) return res.send({
                            status: false,
                            message: 'AddOns option Id is required!',
                            errorCode: 422
                        })
                        if (!addOns[j].price && addOns[j].price !== 0) return res.send({
                            status: false,
                            message: 'AddOns price is required!',
                            errorCode: 422
                        })
                    }
                }
            }
            getSecureConnection(
                res,
                customerId,
                `SELECT orderNumber FROM orders WHERE restaurantID = '${restaurantId}' ORDER BY createdAt DESC LIMIT 1`,
                null,
                (result) => {
                    const orderNumber = padding(Number(result.length ? result[0].orderNumber : 0) + 1, 3)
                    getConnection(
                        res,
                        `SELECT restaurantName FROM restaurants WHERE restaurantID = '${restaurantId}'`,
                        null,
                        (restuarantData) => {
                            const restaurantName = restuarantData[0].restaurantName
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
                                        VALUES ( '${restaurantId}', ${customerId}, 'Take-Away', ${orderNumber}, 0)`,
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
                                                        const { itemId, quantity, name, price, totalPrice, specialInstructions, addOns } = items[i]
                                                        const orderItem = {}
                                                        orderItem.restaurantId = restaurantId
                                                        orderItem.orderNumber = orderNumber
                                                        orderItem.itemId = itemId
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
                                                                    for (var j = 0; j < addOns.length; j++) {
                                                                        query = query + ` ( '${result3.insertId}', '${addOns[j].addOnId}', '${addOns[j].addOnName}', '${addOns[j].addOnOptionId}', '${addOns[j].addOnOption}', '${addOns[j].price}' )`
                                                                        if (j !== (addOns.length - 1))
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
                                                                restaurantName,
                                                                tableId: null,
                                                                type: 'Take-Away'
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
            (orderItems) => {
                getConnection(
                    res,
                    `SELECT o.discount, o.discountType, o.tip, r.taxPercentage
                    FROM orders o
                    JOIN restaurants r on o.restaurantId = r.restaurantId
                    WHERE o.restaurantId = '${restaurantId}'
                    AND o.orderNumber = '${orderNumber}'`,
                    null,
                    (result) => {
                        if (result.length) {
                            let foodTotal = 0
                            if (orderItems && orderItems.length) {
                                for (let index = 0; index < orderItems.length; index++) {
                                    foodTotal += orderItems[index].totalPrice;
                                }
                            }
                            const data = result[0]
                            let discountAmount = data.discount.toFixed(2)
                            if (data.discountType === '%')
                                discountAmount = ((foodTotal * data.discount) / 100).toFixed(2)
                            const subtotal = discountAmount < foodTotal ? foodTotal - discountAmount : 0
                            const taxAmount = (((subtotal) * data.taxPercentage) / 100).toFixed(2)
                            return res.send({
                                status: true,
                                message: '',
                                body: {
                                    foodTotal: Number(foodTotal.toFixed(2)),
                                    discount: data.discount + `${data.discountType}`,
                                    discountAmount: Number(discountAmount),
                                    subtotal: Number(subtotal.toFixed(2)),
                                    taxPercentage: data.taxPercentage + '%',
                                    taxAmount: Number(taxAmount),
                                    tip: Number(data.tip.toFixed(2)),
                                    billAmount: Number((subtotal + Number(taxAmount) + data.tip).toFixed(2)),
                                    orderItems
                                }
                            })
                        } else {
                            return res.send({
                                status: false,
                                message: 'No Order details available!',
                                errorCode: 422
                            })
                        }
                    }
                )
            }
        )
    })

    app.post('/customer/closeOrderViaCash', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/closeOrderViaCash")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            const { restaurantId, orderNumber, type, tip } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
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
            if (tip && tip < 0) return res.send({
                status: false,
                message: 'Tip can\'t be negative!',
                errorCode: 422
            })
            let data
            if (type.toLowerCase() === 'take-away')
                data = { status: true, customerStatus: true }
            else data = { customerStatus: true }

            if (tip) {
                data.tip = tip
            }
            getSecureConnection(
                res,
                customerId,
                `UPDATE orders SET ? WHERE restaurantId = '${restaurantId}' AND orderNumber = '${orderNumber}' AND customerStatus = 0`,
                data,
                (result) => {
                    if (result.changedRows) {
                        getConnection(
                            res,
                            `SELECT fcmToken FROM users WHERE restaurantId = '${restaurantId}' AND (role = 'Admin' || role = 'Staff' || role = 'Kitchen') AND active = 1`,
                            null,
                            (result) => {
                                if (result.length) {
                                    var registration_ids = result.map(each => each['fcmToken'])
                                    sendNotification({
                                        registration_ids,
                                        data: {
                                            title: 'DineMate',
                                            body: JSON.stringify({
                                                roles: ['Admin', 'Staff', 'Kitchen'],
                                                type: 'DASHBOARD',
                                                restaurantId,
                                                orderNumber
                                            })
                                        }
                                    })
                                }
                            }
                        )
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

    app.post('/customer/closeOrderViaStripe', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/closeOrderViaStripe")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            const { restaurantId, orderNumber, type, tip, billAmount, token, email } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
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
            if (tip && tip < 0) return res.send({
                status: false,
                message: 'Tip can\'t be negative!',
                errorCode: 422
            })
            if (billAmount < 0) return res.send({
                status: false,
                message: 'Bill amount can\'t be negative!',
                errorCode: 422
            })
            if (!billAmount && billAmount != 0) return res.send({
                status: false,
                message: 'Bill amount is required!',
                errorCode: 422
            })
            if (billAmount <= 0) return res.send({
                status: false,
                message: 'Bill amount must be greater than or equal to 0.01$',
                errorCode: 422
            })
            if (!token) return res.send({
                status: false,
                message: 'Stripe token is required!',
                errorCode: 422
            })

            getSecureConnection(
                res,
                customerId,
                `SELECT stripeConnectedAccountId FROM restaurants WHERE restaurantId = '${restaurantId}'`,
                null,
                (result) => {
                    if (result.length && result[0].stripeConnectedAccountId) {
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
                                    } else {
                                        const orderClosingQuery = `UPDATE orders SET
                                        status = ${type.toLowerCase() === 'take-away' ? 1 : 0},
                                        customerStatus = 1
                                        ${tip ? `, tip = ${tip}` : ''}
                                        ${type.toLowerCase() === 'dine-in' ? ', closedAt = CURRENT_TIMESTAMP' : ''}
                                        WHERE restaurantId = '${restaurantId}'
                                        AND orderNumber = '${orderNumber}'
                                        AND customerStatus = 0`

                                        tempDb.query(orderClosingQuery, null, async function (error, result2) {
                                            if (!!error) {
                                                console.log('TableError', error.sqlMessage)
                                                tempDb.rollback(function () {
                                                    return res.send({
                                                        status: false,
                                                        message: error.sqlMessage,
                                                        errorCode: 422
                                                    })
                                                })
                                            } else if (result2 && result2.changedRows) {
                                                console.log("payment init")
                                                const paymentSuccess = await postCharge(
                                                    (Number((Number(billAmount) + Number(tip)) * 100).toFixed(0)),
                                                    token,
                                                    email,
                                                    result[0].stripeConnectedAccountId
                                                )
                                                console.log("paymentSuccess", paymentSuccess)
                                                if (paymentSuccess)
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
                                                        getConnection(
                                                            res,
                                                            `SELECT fcmToken FROM users WHERE restaurantId = '${restaurantId}' AND (role = 'Admin' || role = 'Staff' || role = 'Kitchen') AND active = 1`,
                                                            null,
                                                            (result) => {
                                                                if (result.length) {
                                                                    var registration_ids = result.map(each => each['fcmToken'])
                                                                    sendNotification({
                                                                        registration_ids,
                                                                        data: {
                                                                            title: 'DineMate',
                                                                            body: JSON.stringify({
                                                                                roles: ['Admin', 'Staff', 'Kitchen'],
                                                                                type: 'DASHBOARD',
                                                                                restaurantId,
                                                                                orderNumber
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        )
                                                        return res.send({
                                                            status: true,
                                                            message: type.toLowerCase() === 'take-away' ?
                                                                'Order Initialized Successfully'
                                                                : 'Order close request submitted'
                                                        })
                                                    })
                                                else {
                                                    tempDb.rollback(function () { })
                                                    tempDb.release()
                                                    return res.send({
                                                        status: false,
                                                        message: 'Stripe payment failed!',
                                                        errorCode: 422
                                                    })
                                                }
                                            } else {
                                                tempDb.release()
                                                return res.send({
                                                    status: false,
                                                    message: 'Request already in que!',
                                                    errorCode: 422
                                                })
                                            }
                                        })
                                    }
                                })
                            })
                    } else return res.send({
                        status: false,
                        message: `Online payment not allowed for ${capitalizeFirstLetter(restaurantId)}!`,
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
            `SELECT status, customerStatus FROM orders WHERE restaurantId = '${restaurantId}' AND orderNumber = '${orderNumber}'`,
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
                        message: 'Order has been cancelled by restaurant',
                        errorCode: 422
                    })
                }
            }
        )
    })

    app.post('/customer/doNotDisturb', async (req, res) => {
        console.log("\n\n>>> /customer/doNotDisturb")
        console.log(req.body)
        const customerId = decrypt(req.header('authorization'))
        const { restaurantId, orderNumber, enabled } = req.body
        if (!customerId) return res.send({
            status: false,
            message: 'Not Authorized!',
            errorCode: 401
        })
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
        getSecureConnection(
            res,
            customerId,
            `UPDATE orders SET ? WHERE restaurantId = '${restaurantId}' AND orderNumber = '${orderNumber}'`,
            { doNotDisturb: enabled },
            () => {
                getConnection(
                    res,
                    `SELECT fcmToken FROM users WHERE restaurantId = '${restaurantId}' AND (role = 'Admin' || role = 'Staff') AND active = 1`,
                    null,
                    (result) => {
                        if (result.length) {
                            var registration_ids = result.map(each => each['fcmToken'])
                            sendNotification({
                                registration_ids,
                                data: {
                                    title: 'DineMate',
                                    body: JSON.stringify({
                                        roles: ['Admin', 'Staff'],
                                        type: 'GET_RESTAURANT_DASHBOARD',
                                        restaurantId
                                    })
                                }
                            })
                        }
                    }
                )
                return res.send({
                    status: true,
                    message: 'Do not disturb status changed!'
                })
            }
        )
    })

    app.post('/customer/requestService', async (req, res) => {
        try {
            console.log("\n\n>>> /customer/requestService")
            console.log(req.body)
            const customerId = decrypt(req.header('authorization'))
            const { restaurantId, tableId, orderNumber, text } = req.body
            if (!customerId) return res.send({
                status: false,
                message: 'Not Authorized!',
                errorCode: 401
            })
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
            const data = { restaurantId, tableNumber: tableId, orderNumber, text }
            getSecureConnection(
                res,
                customerId,
                `INSERT INTO servicesQue SET ?`,
                data,
                (result) => {
                    if (result.affectedRows) {
                        getConnection(
                            res,
                            `SELECT fcmToken FROM users WHERE restaurantId = '${restaurantId}' AND (role = 'Admin' || role = 'Staff') AND active = 1`,
                            null,
                            (result) => {
                                if (result.length) {
                                    var registration_ids = result.map(each => each['fcmToken'])
                                    sendNotification({
                                        registration_ids,
                                        data: {
                                            title: 'DineMate',
                                            body: JSON.stringify({
                                                roles: ['Admin', 'Staff'],
                                                type: 'GET_SERVICES_QUE',
                                                restaurantId
                                            })
                                        }
                                    })
                                }
                            }
                        )
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

    app.post('/customer/updateProfileImage', uploader, async (req, res) => {
        const customerId = decrypt(req.header('authorization'))
        const { file } = req
        if (!customerId) return res.send({
            status: false,
            message: 'Not Authorized!',
            errorCode: 401
        })
        if (!file) return res.send({
            status: false,
            message: 'File is required!',
            errorCode: 422
        })

        const name = file.originalname.split('.')
        const fileType = name[name.length - 1]
        const fileName = `${uuid()}.${fileType}`

        let params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer
        }

        s3.upload(params, (error, data) => {
            if (error)
                return res.send({
                    status: false,
                    message: error.message,
                    errorCode: 422
                })
            else {
                getSecureConnection(
                    res,
                    customerId,
                    `UPDATE customers SET ? WHERE id = ${customerId}`,
                    { imageUrl: data.Location },
                    (result) => {
                        if (result.changedRows)
                            return res.send({
                                status: true,
                                message: 'Profile Picture Updated Successfully',
                                body: {
                                    imageUrl: data.Location
                                }
                            })
                        else {
                            params = {
                                Bucket: process.env.AWS_BUCKET_NAME,
                                Key: fileName,
                            }

                            s3.deleteObject(params, (error) => {
                                if (error)
                                    console.log(error.message)
                                return res.send({
                                    status: false,
                                    message: 'Failed to update profile picture!',
                                    errorCode: 422
                                })
                            })
                        }

                    }
                )
            }
        })
    })
}

function decrypt(token) {
    const decryptedToken = token
    return decryptedToken
}

function lowerCased(string) {
    return string.toLowerCase()
}

function capitalizeFirstLetter(string) {
    if (string)
        return string.charAt(0).toUpperCase() + string.slice(1);
    else return string
}

function includes(list, id) {
    var result = list.filter(item => item.id === id)
    return result.length
}

function padding(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function registerRestaurantMessage(data) {
    let string = `A new restaurant want to register!\n\n
        Details:`
    const array = Object.keys(data)
        .map((key) => {
            return `\n${key}: ${data[key]}`
        })
    string += array.join()
    return string
}

function forgotPasswordMessage(link) {
    return `Welcome Back!\n\nVisit the following link to reset your login password:\n${link}`
}