import { incidents } from '../db';

export default (req, res, next) => {
  const deleted = {
    value: null,
    delete: false,
  };
  const { redFlagid } = req.params;

  incidents.forEach((item, i) => {
    if (parseFloat(redFlagid) === item.id) {
      incidents.splice(i, 1);
      deleted.delete = true;
    }
  });


  if (!deleted.delete) {
    return res.status(404).send({
      status: 404,
      error: 'Resource not found',
    });
  }

  next();
};
