import Imovel from "../model/Imovel.js"


export default class BuscarImovelController{
    static async buscarImovel(req, res){ 
        try {
           
            const imovel = new Imovel();
            const novoImovel = await imovel.buscarImoveis();
    
            res.status(201).json(novoImovel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}