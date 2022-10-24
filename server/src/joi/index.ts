import * as Joi from 'joi';

/**
 * 字符串，范围0-255，非必须
 */
const JoiCharSchema = Joi.string().max(255);

export { JoiCharSchema };

export default Joi;
