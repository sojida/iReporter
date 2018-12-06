const validatePost = (req, res, next) => {
  let verified = true;
  const error = [];

  const {
    createdBy, type, location, images, videos, comment,
  } = req.body;


  if (!createdBy) {
    verified = false;
    error.push({ createdBy: 'createdBy must be present' });
  }


  if (!type) {
    verified = false;
    error.push({ type: 'type must be present' });
  }

  if (location) {
    if (!(/^-?[\d]{1,2}.[\d]{3,6},-?[\d]{1,2}.[\d]{3,6}$/.test(location))) {
      verified = false;
      error.push({ location: 'location format invalid. Example: (-)90.342345,(-)23.643245.' });
    }
  }

  if (images) {
    if (images.length) {
      images.forEach((item) => {
        if ((!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(item))) {
          verified = false;
          error.push({ images: `${item} this should be an image file` });
        }
      });
    }
  }

  if (videos) {
    if (videos.length) {
      videos.forEach((item) => {
        if ((!(/\.(mp4|mov|mkv)$/i).test(item))) {
          verified = false;
          error.push({ videos: `${item} this should be a video file` });
        }
      });
    }
  }


  if (!comment) {
    verified = false;
    error.push({ comment: 'comment must be present' });
  }

  if (verified) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

const validateLocation = (req, res, next) => {
  const { location } = req.body;

  if (location) {
    if (!(/^-?[\d]{1,2}.[\d]{3,6},-?[\d]{1,2}.[\d]{3,6}$/.test(location))) {
      return res.status(400).json({
        status: 400,
        message: 'location format invalid. Example: (-)90.342345,(-)23.643245.',
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: 'location must be present',
    });
  }


  next();
};

const validateComment = (req, res, next) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      status: 400,
      message: 'Comment must be present',
    });
  }

  next();
};

module.exports = { validatePost, validateLocation, validateComment };
