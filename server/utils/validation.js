import Joi from 'joi';

export default {
  validateIncident(incident) {
    const schema = {
      id: Joi.number(),
      createdOn: Joi.date().required(),
      createdBy: Joi.number().required(),
      location: Joi.string(),
      status: Joi.string().required(),
      images: Joi.array(),
      videos: Joi.array(),
      type: Joi.string().required(),
      comment: Joi.string().required(),
    };
    return Joi.validate(incident, schema);
  },

  validateLocation(location) {
    const schema = {
      location: Joi.string().required(),
    };

    return Joi.validate(location, schema);
  },

  validateComment(comment) {
    const schema = {
      comment: Joi.string().required(),
    };

    return Joi.validate(comment, schema);
  },

}
