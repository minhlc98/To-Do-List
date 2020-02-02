const { User } = require('../models/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const uuid = require('uuid')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.PASSWORD
    }
})

const sendMail = (email, lastName, activateCode) => {
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'Verify your email',
        html: `<p>Hi ${lastName}!</p><p>To activate your account, please verify your email address.Your account will not be activated until your email address is confirmed.</p><a href="http://localhost:3000/activate/${activateCode}">Confirm Email</a>`
    }
    transporter.sendMail(mailOptions)
}
module.exports = {
    async signUp(req, res) {
        const { name, email, password } = req.body
        const isUserExist = await User.findOne({ email }).lean()
        const saltRound = 12
        const hashedPass = await bcrypt.hash(password, saltRound)
        const activateCode = uuid()
        if (isUserExist) {
            // If account was created and activated => user already exist
            // Otherwise editing this account with new information
            if (isUserExist.isActivated) {
                res.status(400).json({
                    errMessage: 'The email already exist. Let use another one.'
                })
                return
            }
            else {
                //Edit user with new information
                await User.updateOne(
                    { email },
                    {
                        $set: {
                            name,
                            password: hashedPass,
                            activateCode
                        }
                    }
                )
                sendMail(email, name.lastName, activateCode)
                res.json({
                    activateCode
                })
                return
            }
        }
        // Add new user
        const user = User({
            name,
            email,
            password: hashedPass,
            activateCode
        })
        await user.save()
        sendMail(email, name.lastName, activateCode)
        res.json({
            activateCode
        })
    },
    async confirmEmail(req, res) {
        const { activateCode } = req.body
        const newActivateCode = uuid()
        // use old activate code to set activate and set new activate code 
        const resultUpdate = await User.updateOne({ activateCode }, { $set: { isActivated: true, activateCode: newActivateCode } })
        // get user using new activate code
        const { nModified } = resultUpdate
        if (nModified !== 0) {
            const user = await User.findOne({ activateCode: newActivateCode }, { __v: 0 }).lean()
            const { _id } = user
            const token = jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: 60 * 60 })
            res.json({
                user,
                token
            })
        }
        else {
            res.status(404).json({
                errMessage: 'User not found.'
            })
        }
    },
    async signIn(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email, isActivated: true }, { __v: 0 }).lean()
        if (user) {
            const compareResult = await bcrypt.compare(password, user.password)
            if (compareResult) {
                const { _id } = user
                const token = jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: 60 * 60 })
                res.json({
                    user,
                    token
                })
            } else {
                res.status(400).json({
                    errMessage: 'Email or password is incorrect.'
                })
            }
        }
        else {
            res.status(400).json({
                errMessage: 'Email or password is incorrect.'
            })
        }

    },
    async randomUsers(req, res) {
        // Get the count of all users
        User.count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count)

            // Again query all users but only fetch one offset by our random #
            User.findOne().skip(random).exec(
                function (err, result) {
                    // Tada! random user
                    res.send(result)
                })
        })
    }
}