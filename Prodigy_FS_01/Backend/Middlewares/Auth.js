import jwt from 'jsonwebtoken'
import ErrorHandler from './ErrorHandler.js';
import User from '../Models/User.js';

export const isCustomerAuthenticated = async(req,res,next) => {
    const token = req.cookies.CustomerToken;
    if(!token) return next(new ErrorHandler("User Not Authenticated!", 400))

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    if(req.user.role !== "Customer") return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403))
    
    next()
}

export const isAdminAuthenticated = async(req,res,next) => {
    const token = req.cookies.AdminToken;
    if(!token) return next(new ErrorHandler("User Not Authenticated!", 400))

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    if(req.user.role !== "Admin") return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403))
    
    next()
}