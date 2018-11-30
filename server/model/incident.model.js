export default class Incident {
  constructor(id, createdBy, type, location, status, images, videos, comment) {
    this.id = id;
    this.createdOn = new Date().toString();
    this.createdBy = createdBy;
    this.type = type;
    this.location = location;
    this.status = status;
    this.images = images;
    this.videos = videos;
    this.comment = comment;
  }
}
