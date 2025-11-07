const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OFFICIAL_EMAIL,
        pass: process.env.OFFICIAL_PASSWORD
    }
})

exports.sendEmail = (to_email, subject, text) => {
    const option  = {
        from: `${process.env.OFFICIAL_EMAIL}`,
        to: `${to_email}`,
        subject: `${subject}`,
        text: `${text}`
    }

    transporter.sendMail(option, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent:", info.response);
        }
    });

}

