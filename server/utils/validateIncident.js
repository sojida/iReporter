import Joi from 'joi';

export default function validateIncident(incident) {
  const schema = {
    id: Joi.number().required(),
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
}
