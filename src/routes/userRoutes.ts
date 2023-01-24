import { Router } from 'express';
import { createUser, getAllUser, getOneUser, loginUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUser)
router.post('/', createUser);
router.get('/:id', getOneUser);
router.post('/login', loginUser);

export default router;