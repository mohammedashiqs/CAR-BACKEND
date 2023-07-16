import express, { NextFunction } from 'express'
import { body, validationResult } from 'express-validator';
import { login } from '../common/services/authService';







const authRouter: express.Router = express.Router()

authRouter.post('/login', [
  body('user_email').not().isEmpty().withMessage('Email is Required'),
  body('password').not().isEmpty().withMessage('Password is Required')
], async (req: express.Request, res: express.Response, next: NextFunction) => {

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }


  try {
    let { user_email, password } = req.body


    //todo login logic
    let tokens = await login(user_email, password)

    res.status(200).json({
      msg: 'user created successfully',
      createdCar: tokens
    })


  } catch (error) {
    next(error)
  }

})