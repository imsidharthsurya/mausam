const request = require("request");


const forecast=(address,callback)=>{
    const url="https://api.weatherapi.com/v1/current.json?key=2fd5fc9fb7a94a879ec91528213101&q="+encodeURIComponent(address)
    request({url,json:true},(error,response)=>{
        if(error)
            callback("Unable to fetch data at the moment please try again later",undefined)
        else if(response.body.error)
            callback("Invalid location name, please enter a valid name",undefined)
        else
            callback(undefined,{
                loc: response.body.location.name,
                country: response.body.location.country,
                temp:response.body.current.temp_c,
                cond: response.body.current.condition.text,
                icon:response.body.current.condition.icon
            })
    })
}

module.exports=forecast