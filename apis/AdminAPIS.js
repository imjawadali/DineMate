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
}

function decrypt(token) {
    const decryptedToken = token
    return decryptedToken
}