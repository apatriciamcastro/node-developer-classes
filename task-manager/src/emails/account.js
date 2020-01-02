const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Goal: Pull JWT secret and database URL into env vars
// 1. Create two new env vars: JWT_SECRET and MONGODB_URL
// 2. Setup values for each in the development env files
// 3. Swap out three hardcoded values
// 4. Test your work. Create new user and get their profile

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'apatriciamcastro@gmail.com',
        subject: 'Welcome!',
        text: `Hello, ${name}! Thanks for joining in on Task Manager App.`
    })
    
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'apatriciamcastro@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Hello, ${name}! We are sorry to see you go. Can you tell us why you are leaving?`
    })

}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
