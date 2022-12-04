const fs=require('fs')
const path =require('path')
const express=require('express')
const server=express()
const flash=require('connect-flash')
const session=require('express-session')

server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(express.static(path.join(__dirname,'./public')))
server.use(session({
    secret:'thatissessionsecret',
    name:'my_flash_session',
    resave:false,
    saveUninitialized:false}))
server.use(flash())

server.set('view engine','ejs')
server.set('views',path.join(__dirname,'./views'))

server.get('/',(req,res)=>{
    const flasMessage=req.flash('wrong')
    res.render('index',{flasMessage:flasMessage})
})

server.post('/posted',(req,res)=>{
    const reqBody=req.body
    if (reqBody.name=="a" && reqBody.surname=="1") {
        req.session.user_name=reqBody.name
        res.redirect('/home')
    }
    else{
        req.flash('wrong','Your username or password wrong !')
        res.redirect('/')
    }
    
})

server.get('/home',(req,res)=>{
    const user_name=req.session.user_name
    res.render('home',{user_name:user_name})
})















server.listen(3000,()=>{
    console.log(`=>>>>>>>>>>>>>>>>>>>>>>>${server.get('env')}///////////////////////////////////////////////////////////////////////////////////////////////////////`)
})