const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//Hasing the password
UserSchema.pre('save',async function(next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(10)
            const hashedPasword = await bcrypt.hash(this.password,salt)
            this.password = hashedPasword
        }
        next()
    }
    catch(error){
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function(password){
     try {
        const status=await bcrypt.compare(password,this.password)
        return status
     } catch (error) {
        throw httpCreateError.InternalServerError(err.message)  
     }
}





const User1 = mongoose.model('user1',UserSchema)

module.exports = User1;