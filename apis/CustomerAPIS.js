const { getSecureConnection, getConnection, getTransactionalConnection } = require('../services/mySqlCustomer')

module.exports = app => {
    app.post('/customer/signUp', async (req, res) => {
        const { firstName, lastName, email, password } = req.body
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
            { firstName, lastName, email, password },
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
    })

    app.post('/customer/login', async (req, res) => {
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
            `SELECT id, firstName, lastName, email FROM customers
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
    })

    app.get('/customer/getAllRestaurants', async (req, res) => {
        getConnection(
            res,
            `SELECT R.restaurantId, R.restaurantName, R.cuisine, R.rating,
            RA.city, RA.address,
            GROUP_CONCAT(c.name) as categories
            FROM restaurants R 
            JOIN restaurantsAddress RA on RA.restaurantId = R.restaurantId 
            LEFT JOIN categories c on c.restaurantId = R.restaurantId
            GROUP BY R.restaurantId
            ORDER BY R.createdAt DESC`,
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

    app.post('/customer/getMenuItems', async (req, res) => {
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
            aoo.id addOnOption_id, aoo.name addOnOption_name,
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
                    for (let i=0; i<data.length; i++) {
                        let addOns = []
                        for (let j=0; j<data.length; j++) {
                            let addOnOptions = []
                            for (let k=0; k<data.length; k++) {
                                if (data[k].addOnOption_id && !includes(addOnOptions, data[k].addOnOption_id) && data[k].addOn_id === data[j].addOn_id) {
                                    addOnOptions.push({
                                        id: data[k].addOnOption_id,
                                        name: data[k].addOnOption_name,
                                    })
                                }
                            }
                            if (data[j].addOn_id && !includes(addOns, data[j].addOn_id)  && data[j].id === data[i].id) {
                                addOns.push({
                                    id: data[j].addOn_id,
                                    name: data[j].addOn_name,
                                    price: data[j].addOn_price,
                                    mandatory: data[j].mandatory,
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

function getGroupedList (list, key) {
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