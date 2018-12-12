const validatePost = (req, res, next) => {
  let verified = true;
  const error = [];

  const {
    type, location, images, videos, comment, title,
  } = req.body;


  if (type) {
    if (type === 'red-flag' || type === 'intervention') {
      verified = true;
      if (req.type !== type) {
        verified = false;
        error.push({ type: 'please use the right route' });
      }
    } else {
      verified = false;
      error.push({ type: 'type can only be red-flag or intervention' });
    }
  } else {
    verified = false;
    error.push({ type: 'type must be present' });
  }


  if (!title) {
    verified = false;
    error.push({ title: 'title must be present' });
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
      errors: error,
    });
  }
};

const validateLocation = (req, res, next) => {
  const { location } = req.body;

  if (location) {
    if (!(/^-?[\d]{1,2}.[\d]{3,6},-?[\d]{1,2}.[\d]{3,6}$/.test(location))) {
      return res.status(400).json({
        status: 400,
        error: 'location format invalid. Example: (-)90.342345,(-)23.643245.',
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      error: 'location must be present',
    });
  }


  next();
};

const validateComment = (req, res, next) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      status: 400,
      error: 'Comment must be present',
    });
  }

  next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  let verified = true;
  const error = [];

  if (status) {
    if (status === 'resolved' || status === 'investigating' || status === 'rejected') {
      verified = true;
    } else {
      verified = false;
      error.push({ status: 'error type must be: investigating, rejected or resolved' });
    }
  } else {
    verified = false;
    error.push({ status: 'status must be present' });
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

module.exports = {
  validatePost,
  validateLocation,
  validateComment,
  validateStatus,
};
