import validation from '../utils/validation';

export default (req, res, next) => {
    const comment = req.body.comment
    const result = validation.validateComment({comment});
  
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message,
      });
    }
  
  
    next();
  };