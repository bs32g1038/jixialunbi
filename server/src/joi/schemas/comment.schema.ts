/**
 * joi 校验 schema
 */
import Joi from '..';

export const CommentSchema = {
  id: Joi.number(),
  content: Joi.string().custom((value, helpers) => {
    if (value.replace(/<[^<>]+>/g, '').length > 400) {
      return helpers.error('content length cannot be greater than 400 !');
    }
    return value;
  }),
  postId: Joi.number(),
  parentId: Joi.number().allow(null),
  replyId: Joi.number().allow(null),
  authorId: Joi.number(),
};

export const PostSchema = {
  title: Joi.string().custom((value, helpers) => {
    if (value.replace(/<[^<>]+>/g, '').length > 400) {
      return helpers.error('title length cannot be greater than 400 !');
    }
    return value;
  }),
  categoryId: Joi.number(),
  tags: Joi.string().allow(''),
  pics: Joi.string().allow(''),
};

export const UserSchema = {
  id: Joi.number(),
  username: Joi.string().max(18),
  email: Joi.string(),
  about: Joi.string().max(50),
  image: Joi.string(),
  password: Joi.string(),
};
