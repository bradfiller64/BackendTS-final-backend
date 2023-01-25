import { Router } from 'express';
import { createUser, getAllUser, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUser)
router.post('/', createUser);
router.get('/:id', getUser);
router.post('/login', loginUser);

export default router;