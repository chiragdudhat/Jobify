import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import  {BadRequestError, NotFoundError, UnAuthenticatedError} from '../errors/index.js'
import attachCookies from "../utils/attachCookies.js"

const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        throw new BadRequestError('please provide all values')
    }

    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use')
    }
    const user = await User.create(req.body)
    const token = user.createJWT()
    attachCookies({res, token})
    res.status(StatusCodes.CREATED)
        .json({ 
            user: {
                name:user.name,
                lastName:user.lastName, 
                location:user.location, 
                email:user.email
            }, 
           
            location: user.location
         })
}
const login = async (req, res) => {
    const {email, password} =req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    attachCookies({res, token})
    res.status(StatusCodes.OK).json({user,  location: user.location})
}

const updateUser = async (req, res) => {
    const { name, email, lastName, location} = req.body;
    if ( !name ||!email || !lastName || !location ){
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({_id : req.user.userId})
    
    user.name = name;
    user.email = email;
    user.location = location
    user.lastName = lastName

    user.save()

    const token = user.createJWT()
    attachCookies({res, token})
    res.status(StatusCodes.OK).json({user,location: user.location})

}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id:req.user.userId})
    res.status(StatusCodes.OK).json({user,location: user.location})

}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() )
    });
    res.status(StatusCodes.OK).json({msg:'user logged out!'})
}

export {register, login, updateUser, getCurrentUser, logout}