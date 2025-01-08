import Imovel from "../model/Imovel.js"

export default class EditarImovelController {
    static async editar(req, res) {
        try {
            const id = parseInt(req.params.id); // ID do imóvel a ser editado
            const { dados, latitude, longitude } = req.body;

            const imovel = new Imovel();
            const imovelAtualizado = await imovel.editarImovel(id, {
                titulo: dados.titulo,
                nome: dados.nome,
                descricao: dados.descricao,
                valor: parseInt(dados.valor),
                contato: dados.contato,
                latitude,
                longitude,
            });

            res.status(200).json(imovelAtualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}