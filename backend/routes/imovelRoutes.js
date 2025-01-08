import { Router } from 'express';
import ImovelController from '../controllers/ImovelController.js';
import BuscarImovelController from '../controllers/BuscarImovelController.js';
import DeletarImovelController from '../controllers/deletarImovelController.js';
import EditarImovelController from "../controllers/EditarImovelController.js";
const router = Router();

router.post('/', ImovelController.criarImovel);
router.get('/', BuscarImovelController.buscarImovel);
router.delete('/:id',DeletarImovelController.deletar);
router.put("/:id", EditarImovelController.editar); // Nova rota para edição de imovel

export default router;
