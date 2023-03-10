import jwt from 'jsonwebtoken'
import { UnAuthenticatedError} from '../errors/index.js'

const auth = async (req, res, next)=>{
    console.log(req.cookies);
    const authHeader = req.headers.authorization 
   
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    
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