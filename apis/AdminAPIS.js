const { getSecureConnection, getConnection } = require('../services/mySql');

module.exports = app => {
    app.get('/secureTest', async (req, res) => {
        const token = decrypt(req.header('authorization'))
        getSecureConnection(
            res,
            token,
            `SELECT * FROM posts WHERE id = 1`,
            null,
            (data) => {
                return res.send({
                    'data': data[0] || {}
                })
            }
        )
    })

    app.post('/admin/login', async (req, res) => {
        const { email, password } = req.body
        if (!email) return res.status(422).send({ 'msg': 'Email is required!' })
        if (!password) return res.status(422).send({ 'msg': 'Password is required!' })
        getConnection(
            res,
            `SELECT id, email, role FROM users WHERE email = '${email}' AND password = '${password}'`,
            null,
            (data) => {
                if (data[0])
                    return res.send(data[0])
                else
                    return res.status(422).send({ 'msg': 'Invalid credentials provided!' })
            }
        )
    })
}

function decrypt(token) {
    const decryptedToken = token
    return decryptedToken
}