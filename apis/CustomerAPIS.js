const { getSecureConnection, getConnection } = require('../services/mySql')

module.exports = app => {
    app.get('/test', async (req, res) => {
        const token = decrypt(req.header('authorization'))
        getConnection(
            res,
            `SELECT * FROM posts`,
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