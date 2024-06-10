import { Router } from 'express';
import PostController from '../controllers/PostController';
import AutenticacaoMiddleware from '../middleware/Middleware';

const PostRouter = Router();

PostRouter.use(AutenticacaoMiddleware.userAutorized);

PostRouter.get('/api/posts', AutenticacaoMiddleware.userAutorized, PostController.listPost);

PostRouter.post('/api/post', AutenticacaoMiddleware.userAutorized, PostController.createPost);

PostRouter.patch('/api/post/:id', AutenticacaoMiddleware.userAutorized,PostController.updatePost);

PostRouter.delete('/api/post/:id', AutenticacaoMiddleware.userAutorized, PostController.deletePost);

export default PostRouter;