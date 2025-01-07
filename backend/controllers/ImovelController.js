import Imovel from "../model/Imovel.js"


export default class ImovelController{
    static async criarImovel(req, res){
        try {
            const { titulo, nome, descricao, valor, contato, latitude, longitude } = req.body;
            const imovel = new Imovel();
            const novoImovel = await imovel.criarImovel({
                titulo,
                nome,
                descricao,
                valor,
                contato,
                latitude,
                longitude,
            });
    
            res.status(201).json(novoImovel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}