import express from "express"
import Imovel from "./src/model/Imovel"
const app = express()


app.get("/imovel",(req, res)=> {
    console.log("rota get")
    const imovel = new Imovel()
    const re = imovel.criarImovel()
    res.json(re)


   
})


app.listen(3000, ()=> {
    console.log("servidor Rodando")
})