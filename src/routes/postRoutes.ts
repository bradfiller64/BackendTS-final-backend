import { Router } from 'express';
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/postController';

const router = Router();

router.get('/', getAllPost)
router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;