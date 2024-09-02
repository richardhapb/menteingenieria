import { Router } from 'express';
import { IndexController } from '../controllers/index.js';

export const router = Router();

router.get('/', IndexController.all);
router.post('/', IndexController.create);
router.patch('/', IndexController.update);
