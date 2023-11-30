const {Router}=require('express')
const { home, register, registerpost, login, loginpost, blog, blogpost, blogpage,  } = require('../controller/controllers')
const auth = require('../middleware/auth')
const app=Router()

app.get('/home',auth,home)
app.get('/register',register)
app.post('/register',registerpost)
app.get('/login',login)
app.post('/login',loginpost)

module.exports=app
