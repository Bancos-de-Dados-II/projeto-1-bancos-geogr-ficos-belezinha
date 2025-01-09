import Imovel from "../model/Imovel.js"

export default class DeletarImovelController{
    static async deletar(req, res) {
        try {
            const id =  parseInt(req.params.id)
            
            console.log(id, "id no controller")
            const imovel = new Imovel()
            const imovelDeletado = await imovel.deletarImovel(id)
           
            res.status(200).json(imovelDeletado)
         } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}