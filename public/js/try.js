const weatherForm=document.querySelector("form")
const search=document.querySelector("input")
const msg1=document.querySelector("#msg-1")
const msg2=document.querySelector("#msg-2")
const icon=document.querySelector(".cond")

weatherForm.addEventListener("submit",(e)=>{

    msg1.textContent="Loading..."
    msg2.textContent=""
    icon.src=""
    e.preventDefault()
    const address=search.value
    fetch("http://localhost:3000/weather?address="+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            msg1.textContent=data.error
        }
        else{
            msg1.textContent="Location: "+data.address+", "+data.country
            msg2.textContent="Temperature: "+data.temp+"C, Condition: "+data.condition
            icon.src=data.icon
        }
    })
  })
})
