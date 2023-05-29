const { Photo } = require("./model");
const fs = require("fs");

let photos = [];

module.exports = {
  newJSON: async (data) => {
    return new Promise((resolve, reject) => {
      try {
        let id = photos.length + 1;
        const endData = new Photo(id, data.album, data.name, data.path, data.stamp);
        photos.push(endData);
        resolve(endData);
      } catch (error) {
        reject(error);
      }
    });
  },
  delete: (id) => {
    const photo = photos.filter((x) => x.id == id);
    photos = photos.filter((x) => x.id != id);
    return { status: "usunięto zdjecie z id: " + id, url: photo[0].url };
  },
  update: (data) => {
    const { id, status, statusUrl } = data;
    const file = photos.find((x) => x.id == id);
    file.lastChange = status;
    file.history.push({ status, lastModifiedDate: Date.now(), url: statusUrl ?? "" });
    return file;
  },
  getall: () => photos,
  get: (id) => photos.find((x) => x.id == id),
  addTag: (request) => {
    const photo = photos.find((x) => x.id == request.id);
    if (photo.tags.some((x) => x.name == request.name)) {
      return false;
    }
    photo.tags.push(request.tag);
    return true;
  },
  addManyTags: (request) => {
    const photo = photos.find((x) => x.id == request.id);
    const tags = request.tags.filter((x) => !photo.tags.some((y) => x.name == y.name));
    photo.tags.push(...tags);
  },
  returFile: (id, response) => {
    const file = photos.find((x) => {
      return x.id == id;
    });
    if (file) {
      const filePath = file.url;
      const stat = fs.statSync(filePath);

      response.writeHead(200, {
        "Content-Type": "image/" + "jpg",
        "Content-Length": stat.size,
      });
      fs.readFile(filePath, function (err, content) {
        response.end(content);
      });
    } else {
      response.end("404");
    }
  },
};
