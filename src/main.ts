import express from 'express'

import { authService } from './core/application/auth.service.js'
import { authController } from './adapters/driving/auth.controller.js'
import { drivenPg } from './adapters/driven/pg.repository.js'




const drivingObject = new drivenPg()
const authServiceObject = new authService(drivingObject)
const authControllerObject = new authController(authServiceObject)

const app = express()


app.use(express.json())

app.post('/auth/login', (req, res) => authControllerObject.loginOrRegister(req, res))
app.delete('/auth/logout', (req , res) => authControllerObject.logout(req , res))
app.get('/auth/users', (req, res) => authControllerObject.getAllUsers(req, res))

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})