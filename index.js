const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT || 4000;
const cors = require('cors')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');


const path = require('path');



const https = require('https');
const fs = require('fs');
app.use(morgan("dev"))

app.use(bodyParser.json())


app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'gharbi.haythem1988@gmail.com',
        pass: 'byqpnaqzpublszkz',
      },
    });
app.post('/send-email' , (req,res)=>{
     const {fullname , email ,company , numTel,selectedCheckboxes, message} = req.body
     console.log(req.body)
     const mailOptions= {
      from:email,
      to:'gharbi1988.haithem@gmail.com',
      subject:`Message from ${fullname}`,
      html: `
      <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .header {
            background-color: #f7f7f7;
            padding: 10px;
            text-align: center;
            font-size: 24px;
          }
          .content {
            margin: 20px;
          }
          .content p {
            margin: 5px 0;
          }
          .footer {
            margin: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">New Message from ${fullname}</div>
          <div class="content">
            <p><strong>Full Name:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Phone Number:</strong> ${numTel}</p>
            <p><strong>interessé par:</strong> ${selectedCheckboxes.join(', ')}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <div class="footer">
            This email was sent from your website contact form.
          </div>
        </div>
      </body>
      </html>
    `
     }
 transporter.sendMail(mailOptions , (error,info)=>{
      if(error){
            return res.status(500).send(error.toString())
      }
      res.status(200).json("email send")
 })
})
app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 