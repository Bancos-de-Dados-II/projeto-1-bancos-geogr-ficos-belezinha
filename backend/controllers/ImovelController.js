import Imovel from "../model/Imovel.js"


export default class ImovelController{
    static async criarImovel(req, res){
        try {
            
            console.log(req.body,"dados no controller")
            const { dados, latitude, longitude } = req.body;
            const imovel = new Imovel();
            const novoImovel = await imovel.criarImovel({
                titulo:dados.titulo,
                nome:dados.nome,
                descricao:dados.descricao,
                valor:parseInt(dados.valor),
                contato:dados.contato,
                latitude,
                longitude,
            });
    
            res.status(201).json(novoImovel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}