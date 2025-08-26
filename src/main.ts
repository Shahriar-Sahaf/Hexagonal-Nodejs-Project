import express from 'express'

import { authService } from './core/application/auth.service.js'
import { authController } from './adapters/driving/auth.controller.js'
import { drivenPg } from './adapters/driven/pg.repository.js'



import { PgRepositoryProject } from './adapters/driven/pg.repository.project.js'
import { ProjectService } from './core/application/project.service.js'
import { ProjectController } from './adapters/driving/project.controller.js'
import {createTableProject} from './adapters/DB/config.js'

createTableProject()

// User Dependency Injection
const drivingObject = new drivenPg()
const authServiceObject = new authService(drivingObject)
const authControllerObject = new authController(authServiceObject)


//Projects Dependency Injection
const projectDrivenObject = new PgRepositoryProject()
const projectServiceObject = new ProjectService(projectDrivenObject)
const projectControllerObject  = new ProjectController(projectServiceObject)

const app = express()
app.use(express.json())


//User Routes
app.post('/auth/login', (req, res) => authControllerObject.loginOrRegister(req, res))
app.delete('/auth/logout', (req , res) => authControllerObject.logout(req , res))
app.get('/auth/users', (req, res) => authControllerObject.getAllUsers(req, res))


//Project Routes
app.post('/project/create', (req, res)=> projectControllerObject.createProject(req,res))
app.put('/project/update', (req,res) => projectControllerObject.updateProject(req,res))
app.delete('/project/delete', (req,res) => projectControllerObject.delete(req,res))

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})