const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token){
        res.status(401).json({
            errMessage: 'Access Denied.'
        })
    }
    else{
        try{
            const verify = jwt.verify(token, process.env.SECRET_TOKEN)
            next()
        } catch(err){
            res.status(400).json({
                errMessage: 'Invalid token.'
            })
        }
    }
}