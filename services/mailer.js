const nodemailer = require('nodemailer')

exports.sendEmail = async function (email, subject, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD
        },
    });

    try {
        let info = await transporter.sendMail({
            from: `"DineMate" <${process.env.MAILER_EMAIL}>`,
            to: email,
            subject: subject,
            text: message
        });
        return info
    } catch (error) {
        return null
    }
}