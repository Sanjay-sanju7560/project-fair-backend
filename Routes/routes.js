const express = require('express')
const router = express.Router()
const userControler = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// route for Register
router.post('/register',userControler.register )
//Login
router.post('/login',userControler.login)
//router specific middleware
// add projects 
router.post('/add-projects',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)
//get home projects 
router.get('/home-projects',projectController.getHomeProjects)
//get all projects 
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)
//get user projects 
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)
//edit projects API
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjects)
//remove projects API
router.delete('/remove/edit/:pid',jwtMiddleware,projectController.removeProjects)
// updateUser
router.put('/user/edit/',jwtMiddleware,multerConfig.single("profileImage"),userControler.editUser)

module.exports = router