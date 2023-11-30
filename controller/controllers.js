const user = require("../model/Schema")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const home=(req,res)=>{
    res.render('index')
}
const register  = (req,res)=>{
    res.render('singup')
}
const registerpost = async(req, res)=>{
    const {username,email,password}=req.body
    let match=await user.findOne({email})
    if(match){
        return res.send("user already registered")
    }
    else{
        let security =await bcrypt.hash(password,10)
        let data=await user.create({username,email,password:security})
        console.log(data);
        res.cookie("token",username).redirect("/login")
    }
}
const login=(re,res)=>{
    res.render('login')
}
const loginpost = async(req, res)=>{
    const {email,password}=req.body
    let find=await user.findOne({email:email})
    if(!find)
    {return res.send("email and password not match")}

    let pass=await bcrypt.compare(password,find.password)
    if(find.email != email || !pass)
    {return res.send("email and password not match")}

    let token=jwt.sign({id:find.id},"kdshfdiufyerifcdkfh")
    console.log(token);

    res.cookie("token",token).redirect("/home")
}
module.exports={home,register,registerpost,login,loginpost}