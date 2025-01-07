import { Router } from 'express';
import ImovelController from '../controllers/ImovelController.js';

const router = Router();

router.post('/', ImovelController.criarImovel);

export default router;
