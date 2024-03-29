const joi = require('@hapi/joi')

const authSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(4).required(),
    password2: joi.string().min(4).required(),
    
})

module.exports = {
    authSchema,
}
