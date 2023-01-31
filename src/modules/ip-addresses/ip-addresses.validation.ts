import Joi, { ObjectSchema } from 'joi';
import validate from '../../core/validation/validation.middleware';

export const getIpAddress: {
  params: ObjectSchema;
} = {
  params: Joi.object().keys({
    ip: Joi.string().ip({
      version: [
        'ipv4',
        'ipv6'
      ]
    }).required()
  }),
};

export default {
  validateGetIpAddress: validate(getIpAddress),
};
