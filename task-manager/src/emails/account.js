const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'apatriciamcastro@gmail.com',
        subject: 'Welcome!',
        text: `Hello, ${name}! Thanks for joining in on Task Manager App.`
    })
    
}

// Goal: Send email to user on cancelation
// 1. Setup a new function for sending an email on cancelation
//      - email and name as args
// 2. Include their name in the email and ask why they cancelled
// 3. Call it just after the account is removed
// 4. Run the request and check your inbox

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
