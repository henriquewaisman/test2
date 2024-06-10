import { Router } from 'express';
import AutenticacaoMiddleware from '../middleware/Middleware';
import CommentController from '../controllers/CommentController';

const CommentRouter = Router();

CommentRouter.use(AutenticacaoMiddleware.userAutorized);

CommentRouter.get('/api/comments', AutenticacaoMiddleware.userAutorized, CommentController.listComment);

CommentRouter.post('/api/comment', AutenticacaoMiddleware.userAutorized, CommentController.createComment);

CommentRouter.patch('/api/comment/:id', AutenticacaoMiddleware.userAutorized, CommentController.updateComment);

CommentRouter.delete('/api/comment/:id', AutenticacaoMiddleware.userAutorized, CommentController.deleteComment);

export default CommentRouter;