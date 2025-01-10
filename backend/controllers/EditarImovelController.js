
import Imovel from "../model/Imovel.js";

export default class EditarImovelController {
  static async editar(req, res) {
    try {
        console.log(req.body, "body no controler")
        const { id } = req.params;
        
        console.log(id, "id no controler")

      const { titulo,nome ,descricao,valor,contato, latitude, longitude } = req.body;
     
      console.log(titulo, "Dados no controler")
      if (latitude == null || longitude == null) {
        return res.status(400).json({ error: 'Latitude e Longitude são obrigatórias.' });
      }
        
      const newId = parseInt(id)
      const imovel = await Imovel.findByPk(newId)
      
      console.log(imovel, "imovel")

      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado.' });
      }

      imovel.titulo = titulo || imovel.titulo;
      imovel.nome = nome || imovel.nome;
      imovel.descricao = descricao || imovel.descricao;
      imovel.valor = valor ? parseFloat(valor) : imovel.valor;
      imovel.contato = contato || imovel.contato;
      imovel.cordenadas = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      };

       await imovel.save();

      console.log(imovel,"Nmovel")
      res.status(200).json(imovel);
    } catch (error) {
      res.status(500).json({ error: error.message,details: error });
    }
  }
}
