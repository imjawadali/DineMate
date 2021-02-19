const nodemailer = require('nodemailer')

exports.sendEmail = async function (email, subject, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ivsdeveloper21@gmail.com',
            pass: 'Ivs2021!'
        },
    });

    try {
        let info = await transporter.sendMail({
            from: '"DineMate" <ivsdeveloper21@gmail.com>',
            to: email,
            subject: subject,
            text: message
        });
        return info
    } catch (error) {
        console.log(error.message)
        return null
    }
}