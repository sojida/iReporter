
function saveMedia(req, res, next) {
  if (req.files) {
    const { image, video } = req.files;

    if (image) {
      if (req.body.images.length > 1) {
        req.files.image.forEach((item) => {
          item.mv(`./server/uploads/images/${item.name}`, (err) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                err,
              });
            }
          });
        });
      } else {
        req.files.image.mv(`./server/uploads/images/${req.files.image.name}`, (err) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              err,
            });
          }
        });
      }
    }

    if (video) {
      if (req.body.videos.length > 1) {
        req.files.video.forEach((item) => {
          item.mv(`./server/uploads/videos/${item.name}`, (err) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                err,
              });
            }
          });
        });
      } else {
        req.files.video.mv(`./server/uploads/videos/${req.files.video.name}`, (err) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              err,
            });
          }
        });
      }
    }
  }


  next();
}

module.exports = saveMedia;
