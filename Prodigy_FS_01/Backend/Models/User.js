import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type:String,
        required:true
    },
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.generateWebToken = function (){
    return jwt.sign({id: this._id, username: this.username}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES })
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = model('User', userSchema);

export default User