import express from "express"
import imovelRoutes from "./routes/imovelRoutes.js"
const app = express()
app.use(express.json());
app.use('/api/imoveis', imovelRoutes);



app.listen(3000, ()=> {
    console.log("servidor Rodando")
})