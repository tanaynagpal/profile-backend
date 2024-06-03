import express from "express"
import cors from "cors"
import nodemailer from  "nodemailer"
const app=express()


app.use(express.json())

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "infomailer1011@gmail.com",
      pass: "xyfd lcng cbtc pfhl",
    },
  });


app.listen(8000,()=>{
    console.log("app is listening")
})

app.use(cors({
    origin:"*",
    credentials:true
  }
  ))

app.get("/",(req,res)=>{
    res.send("ok")
})

app.post("/send-mail",(req,res)=>{
    try {
        console.log(req)
        const {name,email,message}=req.body;
    let mailOptions ={
            from: 'infomailer1011@gmail.com', // sender address
            to: "shashikantyadav9718@gmail.com", // list of receivers
            subject: `${name} contacted You`, // Subject line
            html: `<b>Name: </b>${name}<br><br><b>email: </b>${email}<br><br><b>message: </b>${message}<br>`, // html body
      }
    
    async function sendMail(){
        await transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
              console.log("error while sending mail",error)
            }
            else{
              console.log("mail sent successfully")
            }
          })
        
    }

    
    
    sendMail()

    res.send("i have sent it")
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
    
})