import express, { NextFunction } from 'express'
import { body, validationResult } from 'express-validator';
import { login, logout } from '../common/services/authService';







const authRouter: express.Router = express.Router()

authRouter.post('/login', [
  body('email').not().isEmpty().withMessage('Email is Required'),
  body('password').not().isEmpty().withMessage('Password is Required')
], async (req: express.Request, res: express.Response, next: NextFunction) => {

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }


  try {
    let { email, password } = req.body


    //todo login logic
    let tokens = await login(email, password)

    res.status(200).json({
      msg: 'logged in successfully',
      tokens: tokens
    })


  } catch (error) {
    next(error)
  }

})



authRouter.get('/logout', async (req: express.Request, res: express.Response, next: NextFunction)=> {

    try{
        const refreshToken = req.body.refresh_Token;
        if(refreshToken){
          const authDetails = await logout(refreshToken)

          res.status(200).json({
            msg: authDetails
          })
        }
      }catch(error){
        next(error)
      }
})





export default authRouter