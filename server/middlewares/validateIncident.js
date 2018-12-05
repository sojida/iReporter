import validation from '../utils/validation';


export default (req, res, next) => {
  req.body.createdOn = new Date().toDateString();
  const result = validation.validateIncident(req.body);

  if (result.error) {
    return res.status(400).json({
      status: 400,
      message: result.error.details[0].message,
    });
  }


  next();
};
