const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const jsonController = require("./jsonController");

const UPLOAD_PATH = "uploads";

const createImage = async (file, album) =>
  new Promise((resolve, reject) => {
    const name = file.path.substring(file.path.lastIndexOf(path.sep));
    const newPath = path.join(UPLOAD_PATH, album, name);

    if (!fs.existsSync(path.join(UPLOAD_PATH, album))) {
      fs.mkdir(path.join(UPLOAD_PATH, album), async (err) => {
        fs.rename(file.path, newPath, async () => {
          const endData = await jsonController.newJSON({ name: file.name, path: newPath, album, stamp: file.lastModifiedDate });
          resolve(endData);
        });
      });
    } else {
      fs.rename(file.path, newPath, async (err) => {
        const endData = await jsonController.newJSON({ name: file.name, path: newPath, album, stamp: file.lastModifiedDate });
        resolve(endData);
      });
    }
  });

module.exports = {
  saveImage: async (req) => {
    return new Promise((resolve, reject) => {
      try {
        const form = formidable({
          multiples: true,
          uploadDir: UPLOAD_PATH,
          keepExtensions: true,
        });

        const res = [];

        form.parse(req, async (err, fields, files) => {
          if (files.file.length) {
            for (let i = 0; i < files.file.length; i++) {
              res.push(await createImage(files.file[i], fields.album));
            }
            resolve(res);
          } else {
            resolve(await createImage(files.file, fields.album));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteImage: async (fileURL) => {
    return new Promise((resolve, reject) => {
      try {
        fs.unlinkSync(fileURL);
        resolve(fileURL);
      } catch (error) {
        reject(error);
      }
    });
  },
};
