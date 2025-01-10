import Imovel from "../model/Imovel.js"


export default class ImovelController{
    static async criarImovel(req, res){
        try {
            
            console.log(req.body,"dados no controller")
            const { dados, latitude, longitude } = req.body;
            
            if (latitude == null || longitude == null) {
                return res.status(400).json({ error: 'Latitude e Longitude são obrigatórias.' });
              }

            const imovel = await Imovel.create({
                titulo:dados.titulo,
                nome:dados.nome,
                descricao:dados.descricao,
                valor:parseInt(dados.valor),
                contato:dados.contato,
                cordenadas: {
                    type: 'Point',
                    coordinates: [longitude, latitude], // PostGIS espera a ordem como [longitude, latitude]
                },
            })
    
            res.status(201).json(imovel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}