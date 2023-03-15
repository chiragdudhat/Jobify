import jwt from 'jsonwebtoken'
import { UnAuthenticatedError} from '../errors/index.js'

const auth = async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        throw new UnAuthenticatedError('Authentication Indvalid')
    }

    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '6407de41cd55dd9b2e4028f9';
        req.user = {userId: payload.userId, testUser}
       
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authetication Invalid')
    }
   
}

export default auth; 



