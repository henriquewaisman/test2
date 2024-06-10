import { Request, Response } from 'express';
import CommentBankService from '../services/ComentarioBancoService';


class CommentController {
  constructor() {}

  async listComment(req: Request, res: Response) {
    try {
      const comments = await CommentBankService.listCommentBank;
      res.json({
        status: 'ok',
        comments: comments,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async createComment(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body  || !body.authorId  || !body.postId) {
      res.json({
        status: 'error',
        message: 'no parameters',
      });
      return;
    }

    try {
      const newComment = await CommentBankService.insertCommentBank({
        content: body.content,
        author: { connect: { id: body.authorId } },
        post: { connect: { id: body.postId } }
      });
      res.json({
        status: 'ok',
        newComment: newComment,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'no ID',
      });
    }

    const { content, authorId, postId } = req.body;
    if (!content|| !authorId || !postId ) {
      res.json({
        status: 'error',
        message: 'no parameters',
      });
      return;
    }

    try {
      const updatedComment = await CommentBankService.updateCommentBank(
        {
          content: content,
          post: { connect: { id: postId } },
          author: { connect: { id: authorId } },
        },
        parseInt(id)
      );
      res.json({
        status: 'ok',
        newComment: updatedComment,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'no ID',
      });
    }

    try {
      const response = await CommentBankService.deleteCommentBank(parseInt(id));
      if (response) {
        res.json({
          status: 'ok',
          message: 'comment deleted',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  }
}

export default new CommentController();