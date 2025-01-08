import Imovel from "../model/Imovel.js"

export default class EditarImovelController {
    static async editar(req, res) {
        try {
            const id = parseInt(req.params.id); 
            console.log(req.body,"reqbody")
            // ID do imóvel a ser editado
            console.log(id, "id no controler edite")
            const { titulo,nome, descricao,valor,contato, latitude, longitude } = req.body;

            console.log("chegou no edite",titulo)

            const imovel = new Imovel();
            const imovelAtualizado = await imovel.editarImovel(id, {
                titulo,
                nome,
                descricao,
                valor,
                contato,
                latitude,
                longitude,
            });

            res.status(200).json(imovelAtualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}