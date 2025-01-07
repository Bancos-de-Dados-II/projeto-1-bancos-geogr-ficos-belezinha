import express from "express"
import imovelRoutes from "./routes/imovelRoutes.js"
import cors from "cors"
const app = express()
app.use(express.json());
app.use(cors())
app.use('/api/imoveis', imovelRoutes);



app.listen(3000, ()=> {
    console.log("servidor Rodando")
})