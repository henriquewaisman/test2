import { Request, Response } from 'express';
import PostBankService from '../services/PostBankService';


class PostController {
  constructor() {}

  async listPost(req: Request, res: Response) {
    try {
      const posts = await PostBankService.listPostBank;
      res.json({
        status: 'ok',
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async createPost(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.title || !body.published || !body.authorId) {
      res.json({
        status: 'error',
        message: 'no parameters',
      });
      return;
    }

    try {
      const newpost = await PostBankService.insertPostBank({
        title: body.title,
        content: body.content,
        published: body.published,
        author: { connect: { id: body.authorId } },
      });
      res.json({
        status: 'ok',
        newpost: newpost,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async updatePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'no ID',
      });
    }

    const { title, content, published, authorId } = req.body;
    if (!title || !published || !authorId) {
      res.json({
        status: 'error',
        message: 'no parameters',
      });
    }

    try {
      const updatedPost = await PostBankService.updatePostBank(
        {
          title: title,
          content: content,
          published: published,
          author: { connect: { id: authorId } },
        },
        parseInt(id)
      );
      res.json({
        status: 'ok',
        newuser: updatedPost,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'no ID',
      });
    }

    try {
      const response = await PostBankService.deletePostBank(parseInt(id));
      if (response) {
        res.json({
          status: 'ok',
          message: 'Post deleted',
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

export default new PostController();