/**
 * joi 校验 schema
 */
import Joi from '..';

export const CommentSchema = {
  id: Joi.number(),
  content: Joi.string().max(2000),
  postId: Joi.number(),
  parentId: Joi.number().allow(null),
  replyId: Joi.number().allow(null),
  authorId: Joi.number(),
};

export const PostSchema = {
  title: Joi.string().max(2000),
  categoryId: Joi.number(),
  tags: Joi.string(),
};


export const UserSchema = {
  id: Joi.number(),
  username: Joi.string().max(18),
  email: Joi.string(),
  about: Joi.string().max(50),
  image: Joi.string(),
  password: Joi.string(),
};