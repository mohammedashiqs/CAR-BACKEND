import express, { NextFunction } from 'express'
import { body, validationResult } from 'express-validator';
import { login, logout, registerUser } from '../common/services/authService';
import { IUser } from '../user/models/IUser';







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



authRouter.get('/logout', async (req: express.Request, res: express.Response, next: NextFunction) => {

  try {
    const refreshToken = req.body.refresh_Token;
    if (refreshToken) {
      const authDetails = await logout(refreshToken)

      res.status(200).json({
        msg: authDetails
      })
    }
  } catch (error) {
    next(error)
  }
})


authRouter.post('/register', [
  body('user_email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  body('user_location').not().isEmpty().withMessage('Location is required'),
  body('user_info.name').not().isEmpty().withMessage('Name is required')
], async (req: express.Request, res: express.Response, next:NextFunction)=>{

      let errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
              errors: errors.array()
          })
      }

      try{
          let user: IUser = req.body
          //todo registration logic

          let createdUser = await registerUser(user)
          
       
          res.status(200).json({
              msg: 'user created successfully',
              createdCar: createdUser
          })



      }catch(error){
          next(error)
      }
})





export default authRouter