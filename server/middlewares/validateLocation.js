import validation from '../utils/validation';

export default (req, res, next) => {
    const location = req.body.location
    const result = validation.validateLocation({location});
  
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message,
      });
    }
  
  
    next();
  };