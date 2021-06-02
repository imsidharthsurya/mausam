const path=require("path")
const express=require("express")
const hbs=require("hbs")
const request=require("request")
const forecast=require("./forecast.js")


const app=express()
const port=process.env.PORT || 3000

const publicDirPath=path.join(__dirname,"../public")
const viewDirPath=path.join(__dirname,"../template/views")
const partialPath=path.join(__dirname,"../template/partials")

app.use(express.static(publicDirPath))
app.set("view engine","hbs")
app.set("views",viewDirPath)
hbs.registerPartials(partialPath)

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        creator: "Sidharth Surya"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        msg:"Hi i am here to help you",
        creator: "Sidharth Surya"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About Me",
        creator: "Sidharth Surya"
    })
})


app.get("/weather",(req,res)=>{
        if(!req.query.address){
           return res.send({
                error:"Please provide an address"
            })
        }
        forecast(req.query.address,(error,body)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                address:body.loc,
                country:body.country,
                temp:body.temp,
                condition: body.cond,
                icon: body.icon
            })
        })
    })

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        msg:"Help article not found",
        creator:"Sidharth Surya"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        creator: "Sidharth Surya",
        msg:"page not found"
    })
})


app.listen(port,()=>{
    console.log("Server is up and running on port "+port)
})