import { Router } from 'express';
import ImovelController from '../controllers/ImovelController.js';
import BuscarImovelController from '../controllers/BuscarImovelController.js';

const router = Router();

router.post('/', ImovelController.criarImovel);
router.get('/', BuscarImovelController.buscarImovel);

export default router;
