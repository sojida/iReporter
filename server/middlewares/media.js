
function handleMedia(req, res, next) {
  if (req.files) {
    const { image, video } = req.files;
    if (image) {
      if (image.length > 1) {
        req.body.images = [];
        image.forEach((item) => {
          req.body.images.push(item.name);
        });
      } else {
        req.body.images = [image.name];
      }
    }

    if (video) {
      if (video.length > 1) {
        req.body.videos = [];
        video.forEach((item) => {
          req.body.videos.push(item.name);
        });
      } else {
        req.body.videos = [video.name];
      }
    }
  }


  next();
}


module.exports = handleMedia;
