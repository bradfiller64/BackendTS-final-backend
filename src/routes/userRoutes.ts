import { Router } from 'express';
import { createUser, getAllUser, getUser, loginUser, updateUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUser)
router.post('/', createUser);
router.get('/:username', getUser);
router.put('/:username', updateUser);
router.post('/login', loginUser);

export default router;